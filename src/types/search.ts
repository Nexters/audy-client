export interface SearchResultType {
    pkey: string;
    name: string;
    noorLat: string;
    noorLon: string;
    newAddressList: {
        newAddress: {
            fullAddressRoad: string;
        }[];
    };
}
