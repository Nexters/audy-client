import { SearchResultType } from '@/types/search';

export interface TmapRequestParamsType {
    getVehicleRoute: {
        startX: number;
        startY: number;
        endX: number;
        endY: number;
        passList?: string;
        reqCoordType?: string;
        resCoordType?: string;
    };
    getPedestrianRoute: {
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
        radius?: number;
    };
}

export interface TmapResponseType {
    getVehicleRoute: {
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
                totalDistance: number;
                totalTime: number;
            };
        }[];
    };
    getPedestrianRoute: {
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
                totalDistance: number;
                totalTime: number;
            };
        }[];
    };
    getAddressFromLatLng: {
        addressInfo: {
            buildingName: string;
            fullAddress: string;
        };
    };
    getPoiSearch: {
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
