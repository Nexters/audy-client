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
    }

    // 마커 생성
    createMarker({
        latitude,
        longitude,
        iconUrl,
    }: {
        latitude: number;
        longitude: number;
        iconUrl: string;
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
        const marker = this.#markers.find(
            (marker) =>
                marker.getPosition().lat() === latitude &&
                marker.getPosition().lng() === longitude,
        );

        if (!marker) return;

        marker.setMap(null);
    }
}
