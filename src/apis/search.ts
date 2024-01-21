import { makeQueryString } from '@/utils/queryString';

import { getAsync } from './api';

interface POIType {
    // TODO: POIType 정의하기
}

interface GetPOIType {
    searchPoiInfo: {
        count: string;
        page: string;
        totalCount: string;
        pois: {
            poi: POIType[];
        };
    };
}

export const searchRepository = {
    getPOI: async (keyword: string) => {
        const url = `https://apis.openapi.sk.com/tmap/pois`;
        const params = {
            version: 1,
            format: 'json',
            callback: 'result',
            searchKeyword: keyword,
            resCoordType: 'WGS84GEO',
            reqCoordType: 'WGS84GEO',
            count: 10,
            searchType: 'all',
            appKey: import.meta.env.VITE_TMAP_APP_KEY,
        };

        const response = await getAsync<GetPOIType>(
            `${url}?${makeQueryString(params)}`,
        );

        return response.searchPoiInfo.pois.poi;
    },
};
