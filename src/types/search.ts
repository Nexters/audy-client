export interface POIType {
    // TODO: POIType 정의하기
}

export interface GetPOIType {
    searchPoiInfo: {
        count: string;
        page: string;
        totalCount: string;
        pois: {
            poi: POIType[];
        };
    };
}
