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

    // 마커 생성
    createMarker({
        name,
        originName,
        address,
        id,
        lat,
        lng,
        iconHTML = renderToString(
            <Marker order={this.#markers.length + 1} isHidden={false} />,
        ),
        index = this.#markers.length,
    }: {
        name: string;
        originName: string;
        address: string;
        id: string;
        lat: string;
        lng: string;
        iconHTML?: string;
        index?: number;
    }) {
        if (this.#markers.length >= this.#maxMarkerCount) return;

        const newMarker: MarkerType = {
            marker: new Tmapv3.Marker({
                position: new Tmapv3.LatLng(lat, lng),
                iconHTML,
                map: this.#mapInstance,
            }),
            name,
            originName,
            address,
            id,
            lat,
            lng,
            isHidden: false,
        };

        const handleMarkerClick = () => {
            this.createInfoWindow({
                lat,
                lng,
                name,
                address,
                id,
                isPinned: true,
            });
        };

        newMarker.marker.on('Click', handleMarkerClick);

        this.#markers.splice(index, 0, newMarker);

        window.dispatchEvent(
            new CustomEvent('marker:create', {
                detail: newMarker,
            }),
        );

        this.drawPathBetweenMarkers();
        this.clusterMarkers();

        return newMarker;
    }

    // 마커 삭제
    removeMarker(id: string) {
        const markerIndex = this.#markers.findIndex(
            (marker) => marker.id === id,
        );

        const [{ marker: targetMarker }] = this.#markers.splice(markerIndex, 1);
        targetMarker.setMap(null);

        window.dispatchEvent(new CustomEvent('marker:remove', { detail: id }));
    }

    // 마커 수정
    modifyMarker(modifiedMarkers: MarkerType[]) {
        // 기존의 핀을 모두 삭제한 후, 새로운 마커 목록을 기반으로 재구성
        this.#markers.forEach(({ marker }) => marker.setMap(null));

        this.#markers = modifiedMarkers.map(
            ({ marker, lat, lng, isHidden, ...rest }, index) => {
                marker.setMap(null);
                const updatedIconHTML = renderToString(
                    <Marker order={index + 1} isHidden={isHidden} />,
                );

                const updatedMarker = new Tmapv3.Marker({
                    position: new Tmapv3.LatLng(lat, lng),
                    iconHTML: updatedIconHTML,
                    map: this.#mapInstance,
                });

                return { lat, lng, marker: updatedMarker, isHidden, ...rest };
            },
        );

        this.drawPathBetweenMarkers();
    }

    // Marker 객체로부터 위경도 값을 추출하여 반환하는 private 메서드 getMarkerPosition
    #getMarkerPosition(marker: typeof Tmapv3.Marker): [number, number] {
        const markerLatLng = marker.getPosition();
        return [markerLatLng.lng(), markerLatLng.lat()];
    }

    // 맵에 찍힌 마커들을 잇는 경로를 그리는 메서드 drawPathBetweenMarkers
    async drawPathBetweenMarkers() {
        this.#removePath();

        const notHiddenMarkers = this.#markers.filter(
            ({ isHidden }) => !isHidden,
        );

        if (notHiddenMarkers.length < 2) return;

        const path: (typeof window.Tmapv3.LatLng)[] = [];
        const endIndex = notHiddenMarkers.length - 1;
        const MAX_POINTS = 6;

        // NOTE : 한번에 그릴 수 있는 경유지는 최대 5개이므로 API 가 허용되는 단위로 끊는다.
        for (let index = 0; index <= endIndex; index += MAX_POINTS) {
            // NOTE : 시작점이 아니라면, 바로 직전의 종점도 포함하여 경로를 그려야 한다.
            const currentStartIndex = index === 0 ? index : index - 1;
            const currentEndIndex =
                endIndex <= index + MAX_POINTS ? endIndex : index + MAX_POINTS;

            const [startMarker, ...passMarkers] = notHiddenMarkers
                .slice(currentStartIndex, currentEndIndex + 1)
                .map(({ marker }) => marker);

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

        this.#polyline = new Tmapv3.Polyline({
            path,
            fillColor: '#FF0000',
            fillOpacity: 1,
            strokeColor: '#FF0000',
            strokeOpacity: 5,
            map: this.#mapInstance,
        });
    }

    // Map 상에 존재하는 경로의 드러남 여부를 전환하는 메서드 togglePathVisibility
    togglePathVisibility() {
        const updatedVisible = !this.#isPathVisible;
        this.#polyline.setMap(updatedVisible ? this.#mapInstance : null);
        this.#isPathVisible = updatedVisible;
    }

    // 지도 내 경로 모드를 전환하는 메서드 togglePathMode
    async togglePathMode(pathType: PathModeType) {
        this.#pathMode = pathType;
        await this.drawPathBetweenMarkers();
    }

    // Map 상에 존재하는 polyline 을 지우고 경로를 삭제하는 메서드 removePath
    #removePath() {
        if (!this.#polyline) return;
        this.#polyline.setMap(null);
        this.#polyline = null;
    }

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

        const infoWindowLatLng = new Tmapv3.LatLng(lat, lng);
        const content = renderToString(
            <InfoWindow name={name} address={address} isPinned={isPinned} />,
        );

        const infoWindow = new Tmapv3.InfoWindow({
            position: infoWindowLatLng,
            content,
            type: 2,
            border: '0px',
            background: 'none',
            map: this.#mapInstance,
        });

        infoWindow.setMap(this.#mapInstance);
        this.#infoWindow = infoWindow;

        this.#mapInstance.setCenter(infoWindowLatLng);
        this.#mapInstance.setZoom(this.#zoomLevel);

        const handlePinButtonClick = () => {
            if (this.#markers.length >= this.#maxMarkerCount) return;

            this.createMarker({
                name,
                originName: name,
                address,
                id,
                lat,
                lng,
            });

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
            this.removeMarker(id);
            this.removeInfoWindow();

            this.modifyMarker(this.#markers);
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

    // 특정 위경도로 줌인
    zoomIn({ lat, lng }: { lat: string; lng: string }) {
        this.#mapInstance.setCenter(new Tmapv3.LatLng(lat, lng));
        this.#mapInstance.setZoom(this.#zoomLevel);
    }

    // 이미 존재하는 핀인지 확인
    checkIsAlreadyPinned(id: string) {
        return this.#markers.some((marker) => marker.id === id);
    }

    // 핀의 경로에서 숨김 여부를 전환
    toggleMarkerHiddenState(id: string) {
        const targetMarker = this.#markers.find((marker) => marker.id === id);

        if (!targetMarker) return;

        const { isHidden } = targetMarker;
        targetMarker.isHidden = !isHidden;

        const updatedIconHTML = renderToString(
            <Marker
                order={
                    this.#markers.findIndex((marker) => marker.id === id) + 1
                }
                isHidden={!isHidden}
            />,
        );

        targetMarker.marker.setMap(null);

        targetMarker.marker = new Tmapv3.Marker({
            position: new Tmapv3.LatLng(targetMarker.lat, targetMarker.lng),
            iconHTML: updatedIconHTML,
            map: this.#mapInstance,
        });

        this.drawPathBetweenMarkers();

        return !isHidden;
    }

    // 핀의 id를 받아서 핀의 다른 속성 반환
    getMarkerInfoFromId(id: string) {
        const targetMarker = this.#markers.find((marker) => marker.id === id);
        return targetMarker;
    }

    // 현재 지도 상의 모든 마커의 클러스터링을 수행하고, 클러스터링 결과를 업데이트
    clusterMarkers() {
        this.#clusters.forEach((cluster) => {
            cluster.markers.forEach(({ marker }) => {
                marker.setMap(null);
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
                cluster.markers.forEach(({ marker }) => {
                    marker.setMap(this.#mapInstance);
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
