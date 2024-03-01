import { LexoRank } from 'lexorank';
import { renderToString } from 'react-dom/server';

import { TmapRepository } from '@/apis/tmap';
import Cluster from '@/features/map/cluster/Cluster';
import InfoWindow from '@/features/map/info-window/InfoWindow';
import Marker from '@/features/map/marker/Marker';
import { MarkerType, PathModeType } from '@/types/map';

import { ClusterModule } from './ClusterModule';

export interface TmapConstructorType {
    /** 지도를 렌더링할 HTMLDivElement 에 적용할 id */
    mapId?: string;
    /** 지도 Element 의 width */
    width?: number | string;
    /** 지도 Element 의 height */
    height?: number | string;
    /** 지도 Element 의 확대 정도 (1 ~ 15) */
    zoom?: number;
    /** 지도 의 중심점 위도 */
    lat: number;
    /** 지도 의 중심점 경도 */
    lng: number;
}

const { Tmapv3 } = window;

export class TMapModule {
    #mapInstance: typeof Tmapv3.Map;
    #markers: MarkerType[] = [];
    #polyline: typeof Tmapv3.Polyline;

    #isPathVisible = true;
    #pathMode: PathModeType = 'Vehicle';
    #duration = 0;

    #infoWindow: typeof Tmapv3.InfoWindow = null;

    #maxMarkerCount = 15;
    #zoomLevel = 17;

    #clusters: ClusterModule[] = [];

    constructor({
        mapId = 'tmap',
        width = 640,
        height = 480,
        zoom = 10,
        lat,
        lng,
    }: TmapConstructorType) {
        if (typeof window === 'undefined') {
            throw new Error('T Map 은 Server Side 에서 사용할 수 없습니다.');
        }

        const mapElement = document.getElementById(mapId);

        if (!mapElement) {
            throw new Error(
                'T Map 을 렌더링하기 위해 필요한 HTMLDivElement 가 없습니다.',
            );
        }

        this.#mapInstance = new Tmapv3.Map(mapId, {
            center: new Tmapv3.LatLng(lat, lng),
            width: typeof width === 'number' ? `${width}px` : width,
            height: typeof height === 'number' ? `${height}px` : height,
            zoom,
        });

        const handleMapClick = async (event: typeof Tmapv3.maps.MouseEvent) => {
            if (this.#infoWindow) {
                this.removeInfoWindow();
                return;
            }

            const { _lat: lat, _lng: lng } = event._data.lngLat;
            const { fullAddress, buildingName, roadAddressKey } =
                await TmapRepository.getAddressFromLatLngAsync({
                    lat,
                    lng,
                });

            this.createInfoWindow({
                lat,
                lng,
                name: buildingName || '정보 미등록 장소',
                address: fullAddress,
                id: roadAddressKey,
                isPinned: false,
            });
        };

        this.#mapInstance.on('Click', handleMapClick);

        let throttleTimeout: NodeJS.Timeout | null = null;
        const THROTTLE_TIME = 800;

        this.#mapInstance.on('Zoom', () => {
            if (!throttleTimeout) {
                throttleTimeout = setTimeout(() => {
                    this.clusterMarkers();
                    throttleTimeout = null;
                }, THROTTLE_TIME);
            }
        });
    }

    // 특정 위경도로 줌인
    zoomIn({ lat, lng }: Pick<MarkerType, 'lat' | 'lng'>) {
        this.#mapInstance.setCenter(new Tmapv3.LatLng(lat, lng));
        this.#mapInstance.setZoom(this.#zoomLevel);
    }

    /**
     * Marker Method List
     */

    // 마커 생성
    createMarker({
        name,
        originName,
        address,
        id,
        lat,
        lng,
        sequence,
    }: {
        name: string;
        originName: string;
        address: string;
        id: string;
        lat: string;
        lng: string;
        sequence?: string;
    }) {
        const currentMarkerAmount = this.#markers.length;
        if (currentMarkerAmount >= this.#maxMarkerCount) return;

        const latestSequence = this.#markers.at(-1)?.sequence;
        const currentSequence =
            sequence ??
            (latestSequence
                ? LexoRank.parse(latestSequence).genNext().toString()
                : LexoRank.min().toString());

        const currentIndex = this.#getMarkerIndexBySequence(currentSequence);

        const newMarker: MarkerType = {
            instance: new Tmapv3.Marker({
                position: new Tmapv3.LatLng(lat, lng),
                iconHTML: renderToString(
                    <Marker order={currentIndex + 1} isHidden={false} />,
                ),
                map: this.#mapInstance,
            }),
            name,
            originName,
            sequence: currentSequence,
            address,
            id,
            lat,
            lng,
            isHidden: false,
        };

        newMarker.instance.on('Click', () =>
            this.createInfoWindow({
                lat,
                lng,
                name,
                address,
                id,
                isPinned: true,
            }),
        );

        this.#markers.push(newMarker);
        this.#drawMarkers();
        this.drawPathBetweenMarkers();
        this.clusterMarkers();

        window.dispatchEvent(
            new CustomEvent('marker:create', {
                detail: newMarker,
            }),
        );

        return newMarker;
    }

    // 마커 삭제
    removeMarker(id: string) {
        const markerIndex = this.#markers.findIndex(
            (marker) => marker.id === id,
        );

        if (markerIndex === -1) return;

        const [removedMarker] = this.#markers.splice(markerIndex, 1);
        removedMarker.instance.setMap(null);

        this.#drawMarkers();
        this.drawPathBetweenMarkers();
        this.clusterMarkers();

        window.dispatchEvent(new CustomEvent('marker:remove', { detail: id }));
    }

    removeMarkerBySequence(sequence: string) {
        const markerIndex = this.#markers.findIndex(
            (marker) => marker.sequence === sequence,
        );

        if (markerIndex === -1) return;

        const [removedMarker] = this.#markers.splice(markerIndex, 1);
        removedMarker.instance.setMap(null);

        console.log(removedMarker.instance);

        this.#drawMarkers();
        this.drawPathBetweenMarkers();
        this.clusterMarkers();

        window.dispatchEvent(
            new CustomEvent('marker:remove', { detail: removedMarker.id }),
        );
    }

    // 현재 맵 위에 떠 있는 마커 목록을 반환하는 메서드 getMarkers
    getMarkers() {
        return this.#markers;
    }

    // 마커 ID 를 기반으로 특정 마커를 반환하는 메서드 getMarkerById
    getMarkerById(id: string) {
        return this.#markers.find((marker) => marker.id === id);
    }

    // 마커 Sequence 를 기반으로 특정 마커를 반환하는 메서드 getMarkerBySequence
    getMarkerBySequence(sequence: string) {
        return this.#markers.find((marker) => marker.sequence === sequence);
    }

    // 마커의 순서가 변경되었을 경우 이를 지도에 반영하는 메서드 reorderMarkers
    reorderMarkers(reorderedMarkers: MarkerType[]) {
        this.#markers = reorderedMarkers;
        this.#sortMarkers();
        this.#drawMarkers();
        this.drawPathBetweenMarkers();
    }

    renameMarker({ id, name }: Pick<MarkerType, 'id' | 'name'>) {
        const renamedMarker = this.getMarkerById(id);

        if (!renamedMarker) return;

        renamedMarker.name = name;
        this.#drawMarkers();
    }

    // 마커의 숨김 여부를 전환하는 메서드 toggleMarkerHiddenState
    toggleMarkerHiddenState(id: string) {
        const targetMarker = this.#markers.find((marker) => marker.id === id);

        if (!targetMarker) return;

        const { isHidden, lat, lng } = targetMarker;
        targetMarker.isHidden = !isHidden;

        const targetMarkerOrder =
            this.#markers.findIndex((marker) => marker.id === id) + 1;
        const updatedIconHTML = renderToString(
            <Marker order={targetMarkerOrder} isHidden={!isHidden} />,
        );

        targetMarker.instance.setMap(null);
        targetMarker.instance = new Tmapv3.Marker({
            position: new Tmapv3.LatLng(lat, lng),
            iconHTML: updatedIconHTML,
            map: this.#mapInstance,
        });

        this.drawPathBetweenMarkers();

        return !isHidden;
    }

    // Marker 객체로부터 위경도 값을 추출하여 반환하는 private 메서드 getMarkerPosition
    #getMarkerPosition(marker: typeof Tmapv3.Marker): [number, number] {
        const markerLatLng = marker.getPosition();
        return [markerLatLng.lng(), markerLatLng.lat()];
    }

    // 현재 마커 배열을 기준으로 맵 위에 마커를 재구성하는 private 메서드 modifyMarker
    #drawMarkers() {
        this.#sortMarkers();
        this.#markers.map(
            ({ instance, lat, lng, isHidden, sequence, ...rest }, index) => {
                instance.setMap(null);
                const updatedIconHTML = renderToString(
                    <Marker order={index + 1} isHidden={isHidden} />,
                );

                const markerInstance = new Tmapv3.Marker({
                    position: new Tmapv3.LatLng(lat, lng),
                    iconHTML: updatedIconHTML,
                    map: this.#mapInstance,
                });

                return {
                    ...rest,
                    lat,
                    lng,
                    isHidden,
                    sequence,
                    instance: markerInstance,
                };
            },
        );
    }

    // lexoRank 알고리즘을 기반으로 Marker 를 정렬하는 private 메서드 sortMarkers
    #sortMarkers() {
        this.#markers.sort((a, b) => {
            const aSequence = LexoRank.parse(a.sequence);
            const bSequence = LexoRank.parse(b.sequence);
            return aSequence.compareTo(bSequence);
        });
    }

    // 현재 Sequence 를 기반으로 전체 마커 중 몇 번째 순서인지를 파악하는 private 메서드 getMarkerIndexBySequence
    #getMarkerIndexBySequence(markerSequence: string) {
        const sequenceList = this.getMarkers().map(({ sequence }) => sequence);
        sequenceList.push(markerSequence);
        sequenceList.sort((a, b) =>
            LexoRank.parse(a).compareTo(LexoRank.parse(b)),
        );
        return sequenceList.findIndex(
            (sequence) => sequence === markerSequence,
        );
    }

    /**
     * Path Method List
     */

    // 맵에 찍힌 마커들을 잇는 경로를 그리는 메서드 drawPathBetweenMarkers
    async drawPathBetweenMarkers() {
        this.#removePathBetweenMarkers();

        const visibleMarkers = this.#markers.filter(
            ({ isHidden }) => !isHidden,
        );

        if (visibleMarkers.length < 2) return;

        const path: (typeof window.Tmapv3.LatLng)[] = [];
        const endIndex = visibleMarkers.length - 1;
        const MAX_POINTS = 6;
        let totalDuration = 0;

        // NOTE : 한번에 그릴 수 있는 경유지는 최대 5개이므로 API 가 허용되는 단위로 끊는다.
        for (let index = 0; index <= endIndex; index += MAX_POINTS) {
            const currentStartIndex = index === 0 ? index : index - 1;
            const currentEndIndex =
                endIndex <= index + MAX_POINTS ? endIndex : index + MAX_POINTS;

            const [startMarker, ...passMarkers] = visibleMarkers
                .slice(currentStartIndex, currentEndIndex + 1)
                .map(({ instance }) => instance);

            const endMarker = passMarkers.pop();

            const [startX, startY] = this.#getMarkerPosition(startMarker);
            const [endX, endY] = this.#getMarkerPosition(endMarker);

            const passList = passMarkers.length
                ? passMarkers
                      .map((markers) =>
                          this.#getMarkerPosition(markers).join(','),
                      )
                      .join('_')
                : undefined;

            const getPathAsync =
                this.#pathMode === 'Vehicle'
                    ? TmapRepository.getVehiclePathAsync
                    : TmapRepository.getPedestrianPathAsync;

            const { features } = await getPathAsync({
                startX,
                startY,
                endX,
                endY,
                passList,
            });

            // NOTE : 총 경로 시간은 시작점 Point 에서만 반환된다.
            totalDuration += features[0].properties.totalTime;

            features.forEach((feature) => {
                if (feature.geometry.type === 'LineString') {
                    feature.geometry.coordinates.forEach(([lng, lat]) =>
                        path.push(new Tmapv3.LatLng(lat, lng)),
                    );
                }

                if (feature.geometry.type === 'Point') {
                    const [lng, lat] = feature.geometry.coordinates;
                    path.push(new Tmapv3.LatLng(lat, lng));
                }
            });
        }

        this.#duration = totalDuration;
        this.#polyline = new Tmapv3.Polyline({
            path,
            fillColor: '#FF0000',
            fillOpacity: 1,
            strokeColor: '#FF0000',
            strokeOpacity: 5,
            map: this.#mapInstance,
        });

        window.dispatchEvent(
            new CustomEvent('duration:update', {
                detail: totalDuration,
            }),
        );
    }

    // Map 상에 존재하는 polyline 을 지우고 경로를 삭제하는 private 메서드 removePathBetweenMarkers
    #removePathBetweenMarkers() {
        if (!this.#polyline) return;
        this.#polyline.setMap(null);
        this.#polyline = null;
    }

    // Map 상에 존재하는 경로의 드러남 여부를 전환하는 메서드 togglePathVisibility
    togglePathVisibility() {
        const updatedVisibility = !this.#isPathVisible;
        this.#polyline.setMap(updatedVisibility ? this.#mapInstance : null);
        this.#isPathVisible = updatedVisibility;
    }

    // 지도 내 경로 모드를 전환하는 메서드 togglePathMode
    async togglePathMode(pathType: PathModeType) {
        this.#pathMode = pathType;
        await this.drawPathBetweenMarkers();
    }

    // 지도 내 경로를 이동하는데 걸리는 시간을 반환하는 메서드 getPathDuration
    getPathDuration() {
        return this.#markers.length < 2 ? undefined : this.#duration;
    }

    /**
     * InfoWindow Method
     */

    // 인포창 생성
    createInfoWindow({
        lat,
        lng,
        name,
        address,
        id,
        isPinned,
    }: {
        lat: string;
        lng: string;
        name: string;
        address: string;
        id: string;
        isPinned: boolean;
    }) {
        if (this.#infoWindow) this.removeInfoWindow();

        const infoWindowPosition = new Tmapv3.LatLng(lat, lng);
        const content = renderToString(
            <InfoWindow name={name} address={address} isPinned={isPinned} />,
        );

        const infoWindow = new Tmapv3.InfoWindow({
            position: infoWindowPosition,
            content,
            type: 2,
            border: '0px',
            background: 'none',
            map: this.#mapInstance,
        });

        infoWindow.setMap(this.#mapInstance);
        this.#infoWindow = infoWindow;

        this.#mapInstance.setCenter(infoWindowPosition);
        this.#mapInstance.setZoom(this.#zoomLevel);

        const latestSequence = this.#markers.at(-1)?.sequence;
        const sequence = latestSequence
            ? LexoRank.parse(latestSequence).genNext().toString()
            : LexoRank.min().toString();

        const handlePinButtonClick = () => {
            if (this.#markers.length >= this.#maxMarkerCount) return;
            1;
            window.dispatchEvent(
                new CustomEvent('infoWindow:confirm', {
                    detail: {
                        pinName: name,
                        originName: name,
                        latitude: lat,
                        longitude: lng,
                        address,
                        sequence,
                    },
                }),
            );

            this.createInfoWindow({
                lat,
                lng,
                name,
                address,
                id,
                isPinned: true,
            });
        };

        const handleUnPinButtonClick = () => {
            this.removeInfoWindow();

            window.dispatchEvent(
                new CustomEvent('infoWindow:revert', {
                    detail: sequence,
                }),
            );
        };

        document
            .querySelector('#infoWindow')
            ?.addEventListener('click', (event) => event.stopPropagation());

        document
            .querySelector('#pinButton')
            ?.addEventListener('click', handlePinButtonClick);

        document
            .querySelector('#unPinButton')
            ?.addEventListener('click', handleUnPinButtonClick);
    }

    // 인포창 전체 삭제
    removeInfoWindow() {
        this.#infoWindow.setMap(null);
        this.#infoWindow = null;
    }

    /**
     * Cluster Method
     */

    // 현재 지도 상의 모든 마커의 클러스터링을 수행하고, 클러스터링 결과를 업데이트
    clusterMarkers() {
        this.#clusters.forEach((cluster) => {
            cluster.markers.forEach(({ instance }) => {
                instance.setMap(null);
            });
            if (cluster.clusterMarker) cluster.clusterMarker.setMap(null);
        });

        this.#clusters = [];

        this.#markers.forEach((marker) => {
            const clusterIndex = this.findCluster(marker);

            if (clusterIndex === -1) {
                const newCluster = new ClusterModule();
                newCluster.addMarker(marker);
                this.#clusters.push(newCluster);
            } else {
                this.#clusters[clusterIndex].addMarker(marker);
            }
        });

        this.updateClusters();
    }

    // 주어진 마커가 속해야 하는 클러스터의 인덱스 반환
    findCluster(marker: MarkerType): number {
        const MARKER_SIZE = 50;

        for (let i = 0; i < this.#clusters.length; i++) {
            const cluster = this.#clusters[i];
            const center = cluster.getCenter();

            const centerPoint = this.#mapInstance.realToScreen(
                new Tmapv3.LatLng(center.lat, center.lng),
            );
            const markerPoint = this.#mapInstance.realToScreen(
                new Tmapv3.LatLng(
                    parseFloat(marker.lat),
                    parseFloat(marker.lng),
                ),
            );

            if (
                Math.abs(centerPoint.x - markerPoint.x) <= MARKER_SIZE &&
                Math.abs(centerPoint.y - markerPoint.y) <= MARKER_SIZE
            ) {
                return i;
            }
        }
        return -1;
    }

    // 현재 클러스터 상태를 기반으로 클러스터 마커 업데이트
    updateClusters() {
        this.#clusters.forEach((cluster) => {
            const center = cluster.getCenter();
            const size = cluster.getSize();
            const iconHTML = renderToString(<Cluster count={size} />);

            if (cluster.markers.length < 2) {
                cluster.markers.forEach(({ instance }) => {
                    instance.setMap(this.#mapInstance);
                });

                return;
            }

            cluster.clusterMarker = new Tmapv3.Marker({
                position: new Tmapv3.LatLng(center.lat, center.lng),
                iconHTML,
                map: this.#mapInstance,
            });
        });
    }
}
