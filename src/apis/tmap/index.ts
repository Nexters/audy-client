import { postAsync } from '@/apis/api';

import type { TmapReqParams, TmapResponses } from './type';

export class TmapRepository {
    static async getRoutePathAsync({
        startX,
        startY,
        endX,
        endY,
        passList,
        reqCoordType = 'WGS84GEO',
        resCoordType = 'WGS84GEO',
    }: TmapReqParams['getRoutePath']) {
        return postAsync<
            TmapResponses['getRoutePath'],
            TmapReqParams['getRoutePath']
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
                baseURL: `https://apis.openapi.sk.com/tmap`,
                headers: {
                    appKey: import.meta.env.VITE_TMAP_APP_KEY,
                },
                params: {
                    version: 1,
                    format: 'json',
                },
            },
        );
    }
}
