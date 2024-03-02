/** 지도에서 나타내는 경로의 타입 (보행자 | 자동차) */
export type PathModeType = 'Pedestrian' | 'Vehicle';

export interface PinType {
    pinId: string;
    pinName: string;
    originName: string;
    latitude: string;
    longitude: string;
    address: string;
    sequence: string;
}

export interface MarkerType extends PinType {
    isHidden: boolean;
}
