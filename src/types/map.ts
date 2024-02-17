/** 지도에서 나타내는 경로의 타입 (보행자 | 자동차) */
export type PathModeType = 'Pedestrian' | 'Vehicle';

export interface MarkerType {
    marker: typeof window.Tmapv3.Marker;
    name: string;
    originName: string;
    address: string;
    id: string;
    lat: string;
    lng: string;
}

export interface PinType {
    pinId: string;
    pinName: string;
    originName: string;
    latitude: number;
    longitude: number;
    address: string;
    sequence: number;
}