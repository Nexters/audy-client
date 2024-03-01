/** 지도에서 나타내는 경로의 타입 (보행자 | 자동차) */
export type PathModeType = 'Pedestrian' | 'Vehicle';

export interface MarkerType {
    instance: typeof window.Tmapv3.Marker;
    name: string;
    originName: string;
    sequence: number;
    address: string;
    id: string;
    lat: string;
    lng: string;
    isHidden: boolean;
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
