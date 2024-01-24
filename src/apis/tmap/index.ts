import { postAsync } from '@/apis/api';

import type { TmapReqParamsType, TmapResponseType } from './type';

export const TmapRepository = {
    baseUrl: `https://apis.openapi.sk.com/tmap`,
    appKey: import.meta.env.VITE_TMAP_APP_KEY,

    async getRoutePathAsync({
        startX,
        startY,
        endX,
        endY,
        passList,
        reqCoordType = 'WGS84GEO',
        resCoordType = 'WGS84GEO',
    }: TmapReqParamsType['getRoutePath']) {
        return postAsync<
            TmapResponseType['getRoutePath'],
            TmapReqParamsType['getRoutePath']
        >(
            `/routes`,
            {
                startX,
                startY,
                endX,
                endY,
                ...(passList && { passList }),
                reqCoordType,
                resCoordType,
            },
            {
                baseURL: this.baseUrl,
                headers: {
                    appKey: this.appKey,
                },
                params: {
                    version: 1,
                    format: 'json',
                },
            },
        );
    },
};
