interface TmapProps {
    /** 지도를 렌더링할 HTMLDivElement 에 적용할 id */
    mapId?: string;
    /** 지도 Element 의 width (px) */
    width?: number;
    /** 지도 Element 의 width (px) */
    height?: number;
    /** 지도 Element 의 확대 정도 (1 ~ 15) */
    zoom?: number;
    /** 지도 의 중심점 위도 */
    latitude: number;
    /** 지도 의 중심점 경도 */
    longitude: number;
}

type TmapEvent = "ConfigLoad" | "Click" | "Drag" | "DragStart" | "DragEnd" | "TouchStart" | "TouchEnd"

export class TMapModule {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    #mapInstance: typeof window.Tmapv3;

    #markerList: (typeof window.Tmapv3.Marker)[] = [];

    constructor({
        mapId = 'tmap',
        width = 640,
        height = 480,
        zoom = 10,
        latitude,
        longitude,
    }: TmapProps) {
        if (typeof window === 'undefined') {
            throw new Error('T Map 은 Server Side 에서 사용할 수 없습니다.');
        }

        this.#mapInstance = new window.Tmapv3.Map(mapId, {
            center: new window.Tmapv3.LatLng(latitude, longitude),
            width: `${width}px`,
            height: `${height}px`,
            zoom,
        });
    }

    // TMapModule 클래스 인스턴스에서 보유 중인 Map Instance 반환
    getInstance() {
        return this.#mapInstance;
    }

    // Map Instance 에 새로운 마커를 추가하는 메서드 setMarker
    setMarker({
        latitude,
        longitude,
    }: {
        latitude: number;
        longitude: number;
    }) {
        const marker = new window.Tmapv3.Marker({
            position: new window.Tmapv3.LatLng(latitude, longitude),
            map: this.#mapInstance,
        });

        this.#markerList = [...this.#markerList, marker];
    }

    // Map Instance 에 생성된 마커 중 하나를 제거하는 메서드 setMarker
    removeMarker(removedIndex: number) {
        if (this.#markerList.length < removedIndex) return;
        this.#markerList = this.#markerList.filter(
            (_, index) => index !== removedIndex,
        );
    }
}
