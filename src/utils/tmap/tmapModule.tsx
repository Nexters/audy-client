import { renderToString } from 'react-dom/server';

import { TmapRepository } from '@/apis/tmap';
import InfoWindow from '@/features/map/info-window/InfoWindow';
import Marker from '@/features/map/marker/Marker';
import { MarkersType, RouteModeType } from '@/types/map';

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
    #mapInstance: typeof Tmapv3;
    #markers: MarkersType[] = [];
    #polylines: (typeof Tmapv3.Polyline)[] = [];

    #isPathVisible = true;
    #routePathMode: RouteModeType = 'Vehicle';

    #infoWindow: typeof Tmapv3.InfoWindow = null;

    #zoomInLevel = 17; // TODO: 임시
    #maxMarkerCount = 15;

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
            const { fullAddress } = await TmapRepository.getAddressFromLatLng({
                lat,
                lng,
            });

            this.createInfoWindow({
                lat,
                lng,
                name: `장소${this.#markers.length + 1}`,
                address: fullAddress,
                isPinned: false,
            });
        };

        this.#mapInstance.on('Click', handleMapClick);
    }

    // 마커 생성
    createMarker({
        name,
        originName,
        address,
        id,
        lat,
        lng,
        iconHTML,
    }: {
        name: string;
        originName: string;
        address: string;
        id: string;
        lat: number;
        lng: number;
        iconHTML?: string;
    }) {
        if (this.#markers.length >= this.#maxMarkerCount) return;

        const marker = new Tmapv3.Marker({
            position: new Tmapv3.LatLng(lat, lng),
            iconHTML,
            map: this.#mapInstance,
        });

        const handleMarkerClick = () => {
            this.createInfoWindow({
                lat,
                lng,
                name,
                address,
                isPinned: true,
            });
        };

        marker.on('Click', handleMarkerClick);

        this.#markers.push({
            marker,
            name,
            originName,
            address,
            id,
            lat,
            lng,
        });

        window.dispatchEvent(
            new CustomEvent('modifyMarkers', { detail: this.#markers }),
        );
    }

    // 마커 삭제
    removeMarker(markerIndex: number) {
        const targetMarker = this.#markers.splice(markerIndex, 1)[0].marker;
        targetMarker.setMap(null);

        window.dispatchEvent(
            new CustomEvent('modifyMarkers', { detail: this.#markers }),
        );
    }

    // 마커 수정
    modifyMarker(modifiedMarkers: MarkersType[]) {
        // 기존의 경로와 핀을 모두 삭제한 후, 새로운 마커 목록을 기반으로 재구성
        this.#removePath();
        this.#markers.forEach(({ marker }) => marker.setMap(null));
        this.#markers = modifiedMarkers.map(
            ({ marker, lat, lng, ...rest }, index) => {
                marker.setMap(null);
                const updatedIconHTML = renderToString(
                    <Marker order={index + 1} />,
                );
                const updatedMarker = new Tmapv3.Marker({
                    position: new Tmapv3.LatLng(lat, lng),
                    iconHTML: updatedIconHTML,
                    map: this.#mapInstance,
                });
                return { lat, lng, marker: updatedMarker, ...rest };
            },
        );

        const startIndex = 0;
        const endIndex = modifiedMarkers.length - 1;
        this.drawPathBetweenMarkers({ startIndex, endIndex });
    }

    // Marker 객체로부터 위경도 값을 추출하여 반환하는 private 메서드 getMarkerPosition
    #getMarkerPosition(marker: typeof Tmapv3.Marker): [number, number] {
        const markerLatLng = marker.getPosition();
        return [markerLatLng.lng(), markerLatLng.lat()];
    }

    // 시작과 끝 마커의 index 를 인자로 받아 경로를 그리는 메서드 drawPathBetweenMarkers
    async drawPathBetweenMarkers({
        startIndex = 0,
        endIndex = this.#markers.length - 1,
    }: {
        startIndex?: number;
        endIndex?: number;
    }) {
        if (startIndex < 0 || endIndex >= this.#markers.length) return;
        if (this.#markers.length < 2) return;

        this.#removePath();

        const paths: (typeof window.Tmapv3.LatLng)[] = [];
        const MAX_POINTS = 6;

        // NOTE : 한번에 그릴 수 있는 경유지는 최대 5개이므로 API 가 허용되는 단위로 끊는다.
        for (let index = 0; index <= endIndex; index += MAX_POINTS) {
            // NOTE : 시작점이 아니라면, 바로 직전의 종점도 포함하여 경로를 그려야 한다.
            const currentStartIndex = index === 0 ? index : index - 1;
            const currentEndIndex =
                endIndex <= index + MAX_POINTS ? endIndex : index + MAX_POINTS;

            const [startMarker, ...passMarkers] = this.#markers
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

            const getRoutePathAsync =
                this.#routePathMode === 'Vehicle'
                    ? TmapRepository.getVehiclePathAsync
                    : TmapRepository.getPedestrianPathAsync;

            const { features } = await getRoutePathAsync({
                startX,
                startY,
                endX,
                endY,
                passList,
            });

            features.forEach((feature, index) => {
                if (feature.geometry.type === 'LineString') {
                    const path = feature.geometry.coordinates.map(
                        ([lng, lat]) => new Tmapv3.LatLng(lat, lng),
                    );

                    // NOTE : 바로 직전의 feature type 이 Point 라면, 해당 지점의 값도 추가해야 한다.
                    const previousFeature =
                        index > 0 ? features[index - 1] : undefined;
                    if (
                        previousFeature &&
                        previousFeature.geometry.type === 'Point'
                    ) {
                        const [previousLng, previousLat] =
                            previousFeature.geometry.coordinates;
                        path.unshift(
                            new Tmapv3.LatLng(previousLat, previousLng),
                        );
                    }

                    paths.push(path);
                }
            });
        }

        const polylines = paths.map(
            (path) =>
                new Tmapv3.Polyline({
                    path,
                    fillColor: '#FF0000',
                    fillOpacity: 1,
                    strokeColor: '#FF0000',
                    strokeOpacity: 5,
                    map: this.#mapInstance,
                }),
        );

        this.#polylines = polylines;
    }

    // Map 상에 존재하는 경로의 드러남 여부를 전환하는 메서드 togglePathVisibility
    togglePathVisibility() {
        const updatedVisible = !this.#isPathVisible;
        this.#polylines.forEach((polyline) =>
            polyline.setMap(updatedVisible ? this.#mapInstance : null),
        );
        this.#isPathVisible = updatedVisible;
    }

    // 지도 내 경로 모드를 전환하는 메서드 togglePathMode
    async togglePathMode(routeType: RouteModeType) {
        this.#routePathMode = routeType;
        await this.drawPathBetweenMarkers({});
    }

    // Map 상에 존재하는 polyline 을 지우고 경로를 삭제하는 메서드 removePath
    #removePath() {
        if (!this.#polylines.length) return;
        this.#polylines.forEach((polyline) => polyline.setMap(null));
        this.#polylines = [];
    }

    // 인포창 생성
    createInfoWindow({
        lat,
        lng,
        name,
        address,
        isPinned,
    }: {
        lat: number;
        lng: number;
        name: string;
        address: string;
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
        this.#mapInstance.setZoom(this.#zoomInLevel);

        const handlePinButtonClick = () => {
            if (this.#markers.length >= this.#maxMarkerCount) return;

            const iconHTML = renderToString(
                <Marker order={this.#markers.length + 1} />,
            );

            this.createMarker({
                name,
                originName: name,
                address,
                id: String(Math.random()), // FIXME : 임시
                lat,
                lng,
                iconHTML,
            });

            this.removeInfoWindow();

            this.createInfoWindow({
                lat,
                lng,
                name,
                address,
                isPinned: true,
            });

            this.#removePath();
            this.drawPathBetweenMarkers({
                startIndex: 0,
                endIndex: this.#markers.length - 1,
            });
        };

        document
            .querySelector('#infoWindow')
            ?.addEventListener('click', (event) => event.stopPropagation());

        document
            .querySelector('#pinButton')
            ?.addEventListener('click', handlePinButtonClick);
    }

    // 인포창 전체 삭제
    removeInfoWindow() {
        this.#infoWindow.setMap(null);
        this.#infoWindow = null;
    }
}
