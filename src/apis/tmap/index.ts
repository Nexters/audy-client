import { getAsync, postAsync } from '@/apis/api';

import {
    GetReverseGeoCodingType,
    type TmapRequestParamsType,
    type TmapResponseType,
} from './type';

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
    }: TmapRequestParamsType['getRoutePath']) {
        return postAsync<
            TmapResponseType['getRoutePath'],
            TmapRequestParamsType['getRoutePath']
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

    getAddressFromLatLng: async function ({
        lat,
        lng,
    }: {
        lat: number;
        lng: number;
    }) {
        const response = await getAsync<GetReverseGeoCodingType>(
            '/geo/reversegeocoding',
            {
                baseURL: this.baseUrl,
                headers: { appKey: this.appKey },
                params: {
                    version: 1,
                    lat,
                    lon: lng,
                    coordType: 'WGS84GEO',
                    addressType: 'A04', // TODO: 논의 후 수정 예정
                    callback: 'result',
                },
            },
        );

        return response.addressInfo;
    },
};
