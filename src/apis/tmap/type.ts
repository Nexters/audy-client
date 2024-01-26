export interface TmapReqParamsType {
    getRoutePath: {
        startX: number;
        startY: number;
        endX: number;
        endY: number;
        passes?: string;
        reqCoordType?: string;
        resCoordType?: string;
    };
}

export interface TmapResponseType {
    getRoutePath: {
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
}

export interface GetReverseGeoCodingType {
    addressInfo: {
        buildingName: string;
        fullAddress: string;
    };
}
