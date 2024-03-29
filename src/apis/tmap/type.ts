import { SearchResultType } from '@/types/search';

export interface TmapRequestParamsType {
    getVehiclePath: {
        startX: number;
        startY: number;
        endX: number;
        endY: number;
        passList?: string;
        reqCoordType?: string;
        resCoordType?: string;
    };
    getPedestrianPath: {
        startX: number;
        startY: number;
        endX: number;
        endY: number;
        startName?: string;
        endName?: string;
        passList?: string;
        reqCoordType?: string;
        resCoordType?: string;
    };
    getAddressFromLatLng: {
        lat: number;
        lng: number;
    };
    getPoiSearch: {
        keyword: string;
        page?: number;
        limit?: number;
        radius?: number;
    };
}

export interface TmapResponseType {
    getVehiclePath: {
        features: {
            type: 'Feature';
            geometry:
                | {
                      coordinates: [number, number];
                      type: 'Point';
                  }
                | {
                      coordinates: [number, number][];
                      type: 'LineString';
                  };
            properties: {
                index: number;
                description: string;
                totalDistance: number;
                totalTime: number;
                pointType: 'S' | 'E' | 'B1' | 'B2' | 'B3' | 'N';
            };
        }[];
    };
    getPedestrianPath: {
        features: {
            type: 'Feature';
            geometry:
                | {
                      coordinates: [number, number];
                      type: 'Point';
                  }
                | {
                      coordinates: [number, number][];
                      type: 'LineString';
                  };
            properties: {
                index: number;
                description: string;
                totalDistance: number;
                totalTime: number;
                pointType: 'S' | 'E' | 'B1' | 'B2' | 'B3' | 'N';
            };
        }[];
    };
    getAddressFromLatLng: {
        addressInfo: {
            buildingName: string;
            fullAddress: string;
            roadAddressKey: string;
        };
    };
    getPoiSearch: {
        totalCount: number;
        count: number;
        page: number;
        searchPoiInfo: {
            totalCount: number;
            count: number;
            page: number;
            pois: {
                poi: SearchResultType[];
            };
        };
    };
}
