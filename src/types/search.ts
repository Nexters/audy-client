export interface NewAdressType {
    centerLat: string;
    centerLon: string;
    fullAddressRoad: string;
}

export interface POIType {
    id: string;
    name: string;
    newAddressList: { newAddress: NewAdressType[] };
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
