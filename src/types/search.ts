export interface SearchResultType {
    pKey: string;
    name: string;
    noorLat: string;
    noorLon: string;
    newAddressList: {
        newAddress: {
            fullAddressRoad: string;
        }[];
    };
}
