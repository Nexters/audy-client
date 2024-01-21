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
    #mapInstance: typeof window.Tmapv3;
    #markers: (typeof window.Tmapv3.Marker)[] = [];

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
            center: new window.Tmapv3.LatLng(latitude, longitude),
            width: `${width}px`,
            height: `${height}px`,
            zoom,
        });

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
    removeMarker({
        latitude,
        longitude,
    }: {
        latitude: number;
        longitude: number;
    }) {
        const targetMarkerIndex = this.#markers.findIndex(
            (marker) =>
                marker.getPosition().lat() === latitude &&
                marker.getPosition().lng() === longitude,
        );

        if (targetMarkerIndex === -1) return;

        const targetMarker = this.#markers.splice(targetMarkerIndex, 1)[0];
        targetMarker.setMap(null);
    }

    // Marker 객체로부터 위경도 값을 추출하여 반환하는 private 메서드 extractMarkerPosition
    #extractMarkerPosition(
        marker: typeof window.Tmapv3.Marker,
    ): [number, number] {
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
        const startMarker = this.#markers.at(startIndex);
        const endMarker = this.#markers.at(endIndex);

        if (!startMarker || !endMarker) {
            return;
        }

        const [startX, startY] = this.#extractMarkerPosition(startMarker);
        const [endX, endY] = this.#extractMarkerPosition(endMarker);

        const passMarkers = this.#markers.slice(startIndex + 1, endMarker);
        const passList = passMarkers.length
            ? passMarkers
                  .map((markers) =>
                      this.#extractMarkerPosition(markers).join(','),
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

        features.forEach((feature) => {
            if (feature.geometry.type === 'LineString') {
                const path = feature.geometry.coordinates.map(
                    ([lng, lat]) => new Tmapv3.LatLng(lat, lng),
                );

                // TODO : 추후 디자인 시안 확정 시 컬러 수정 필요
                new Tmapv3.Polyline({
                    path,
                    fillColor: '#FF0000',
                    fillOpacity: 1,
                    strokeColor: '#FF0000',
                    strokeOpacity: 5,
                    map: this.#mapInstance,
                });
            }
        });
    }
}
