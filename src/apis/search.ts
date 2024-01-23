import { GetPOIType } from '@/types';

import { getAsync } from './api';

export const searchRepository = {
    getPOI: async (keyword: string) => {
        const response = await getAsync<GetPOIType>('/pois', {
            baseURL: `https://apis.openapi.sk.com/tmap`,
            headers: { appKey: import.meta.env.VITE_TMAP_APP_KEY },
            params: {
                version: 1,
                format: 'json',
                callback: 'result',
                searchKeyword: keyword,
                resCoordType: 'WGS84GEO',
                reqCoordType: 'WGS84GEO',
                count: 10,
                searchType: 'all',
            },
        });

        return response.searchPoiInfo.pois.poi;
    },
};
