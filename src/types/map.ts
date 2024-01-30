/** 지도에서 나타내는 경로의 타입 (보행자 | 자동차) */
export type RouteModeType = 'Pedestrian' | 'Vehicle';

export interface MarkersType {
    marker: typeof window.Tmapv3.Marker;
    name: string;
    originName: string;
    address: string;
    id: string;
    lat: number;
    lng: number;
}
