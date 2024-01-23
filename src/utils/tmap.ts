/* eslint-disable @typescript-eslint/no-explicit-any */
import { TmapRepository } from '@/apis/tmap';

export interface TmapConstructorType {
    /** 지도를 렌더링할 HTMLDivElement 에 적용할 id */
    mapId?: string;
    /** 지도 Element 의 width (px) */
    width?: number;
    /** 지도 Element 의 height (px) */
    height?: number;
    /** 지도 Element 의 확대 정도 (1 ~ 15) */
    zoom?: number;
    /** 지도 의 중심점 위도 */
    latitude: number;
    /** 지도 의 중심점 경도 */
    longitude: number;
}

const { Tmapv3 } = window;

export class TMapModule {
    #mapInstance: typeof Tmapv3;
    #markers: (typeof Tmapv3.Marker)[] = [];

    #pathList: [number, number][] = [];
    #polylineList: (typeof Tmapv3.Polyline)[] = [];

    #isPathVisible: boolean = true;

    #infoWindows: (typeof window.Tmapv3.InfoWindow)[] = [];

    constructor({
        mapId = 'tmap',
        width = 640,
        height = 480,
        zoom = 10,
        latitude,
        longitude,
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
            center: new Tmapv3.LatLng(latitude, longitude),
            width: `${width}px`,
            height: `${height}px`,
            zoom,
        });

        // FIXME : 마커 생성을 위해 임시로 추가한 코드, 제거 필요
        const handleClickMap = (event: any) => {
            const { _lat: latitude, _lng: longitude } = event._data.lngLat;
            this.createMarker({ latitude, longitude });
        };

        this.#mapInstance.on('Click', handleClickMap);
    }

    // 마커 생성
    createMarker({
        latitude,
        longitude,
        iconUrl,
    }: {
        latitude: number;
        longitude: number;
        iconUrl?: string;
    }) {
        const marker = new Tmapv3.Marker({
            position: new Tmapv3.LatLng(latitude, longitude),
            iconUrl,
            map: this.#mapInstance,
        });

        this.#markers.push(marker);
    }

    // 마커 삭제
    removeMarker({ markerIndex }: { markerIndex: number }) {
        const targetMarker = this.#markers.splice(markerIndex, 1)[0];

        targetMarker.setMap(null);
    }

    // Marker 객체로부터 위경도 값을 추출하여 반환하는 private 메서드 getMarkerPosition
    #getMarkerPosition(marker: typeof Tmapv3.Marker): [number, number] {
        const markerLatLng = marker.getPosition();
        return [markerLatLng.lng(), markerLatLng.lat()];
    }

    // 시작과 끝 마커의 index 를 인자로 받아 경로를 그리는 함수 drawPathBetweenMarkers
    async drawPathBetweenMarkers({
        startIndex,
        endIndex,
    }: {
        startIndex: number;
        endIndex: number;
    }) {
        if (startIndex < 0 || endIndex >= this.#markers.length) {
            return;
        }

        const pathList: (typeof window.Tmapv3.LatLng)[] = [];
        const MAX_POINTS = 6;

        // NOTE : 한번에 그릴 수 있는 경유지는 최대 5개이므로 API 가 허용되는 단위로 끊는다.
        for (let index = 0; index <= endIndex; index += MAX_POINTS) {
            // NOTE : 시작점이 아니라면, 바로 직전의 종점도 포함하여 경로를 그려야 한다.
            const currentStartIndex = index === 0 ? index : index - 1;
            const currentEndIndex =
                endIndex <= index + MAX_POINTS ? endIndex : index + MAX_POINTS;

            const [startMarker, ...passMarkers] = this.#markers.slice(
                currentStartIndex,
                currentEndIndex + 1,
            );
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

            const { features } = await TmapRepository.getRoutePathAsync({
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
                    const prevFeature =
                        index > 0 ? features[index - 1] : undefined;
                    if (prevFeature && prevFeature.geometry.type === 'Point') {
                        const [prevLng, prevLat] =
                            prevFeature.geometry.coordinates;
                        path.unshift(new Tmapv3.LatLng(prevLat, prevLng));
                    }

                    pathList.push(path);
                }
            });
        }

        const polylineList = pathList.map(
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

        this.#pathList = pathList;
        this.#polylineList = polylineList;
    }

    // Map 상에 존재하는 경로의 드러남 여부를 전환하는 함수 togglePathVisibility
    togglePathVisibility() {
        const updatedVisible = !this.#isPathVisible;
        this.#polylineList.forEach((polyline) =>
            polyline.setMap(updatedVisible ? this.#mapInstance : null),
        );
        this.#isPathVisible = updatedVisible;
    }

    // Map 상에 존재하는 polyline 을 지우고 경로를 삭제하는 메서드 removePath
    removePath() {
        if (!this.#polylineList.length) return;
        this.#polylineList.forEach((polyline) => polyline.setMap(null));
        this.#polylineList = [];
    }

    // 인포창 생성
    createInfoWindow({
        latitude,
        longitude,
        name,
        address,
    }: {
        latitude: number;
        longitude: number;
        name: string;
        address: string;
    }) {
        this.removeInfoWindow();

        const content =
            "<div style=' position: relative; border-bottom: 1px solid #dcdcdc; line-height: 18px; padding: 0 35px 2px 0;'>" +
            "<div style='font-size: 12px; line-height: 15px;'>" +
            "<span style='display: inline-block; width: 14px; height: 14px; background-image: url('/resources/images/common/footer_logo.png'); vertical-align: middle; margin-right: 5px;'></span>티맵 모빌리티" +
            '</div>' +
            '</div>' +
            "<div style='position: relative; padding-top: 5px; display:inline-block'>" +
            "<div style='display:inline-block; border:1px solid #dcdcdc;'><img src='/resources/images/common/footer_logo.png' width='90' height='70'></div>" +
            "<div style='display:inline-block; margin-left:5px; vertical-align: top;'>" +
            "<span style='font-size: 12px; margin-left:2px; margin-bottom:2px; display:block;'>서울 중구 삼일대로 343 (우)04538</span>" +
            "<span style='font-size: 12px; color:#888; margin-left:2px; margin-bottom:2px; display:block;'>(지번) 저동1가 114</span>" +
            "<span style='font-size: 12px; margin-left:2px;'><a href='https://openapi.sk.com/' target='blank'>개발자센터</a></span>" +
            '</div>' +
            '</div>';

        const infoWindow = new Tmapv3.InfoWindow({
            position: new Tmapv3.LatLng(latitude, longitude),
            content,
            map: this.#mapInstance,
        });

        infoWindow.setMap(this.#mapInstance);
        this.#infoWindows.push(infoWindow);

        this.#mapInstance.setCenter(new Tmapv3.LatLng(latitude, longitude));
    }

    // 인포창 삭제
    removeInfoWindow() {
        this.#infoWindows.forEach((infoWindow) => infoWindow.setMap(null));
    }
}
