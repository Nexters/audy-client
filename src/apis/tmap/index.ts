import { getAsync, postAsync } from '@/apis/api';

import { type TmapRequestParamsType, type TmapResponseType } from './type';

const baseURL = `https://apis.openapi.sk.com/tmap`;
const appKey = import.meta.env.VITE_TMAP_APP_KEY;

export const TmapRepository = {
    // 시작, 종료, 경유지 좌표를 기반으로 자동차 경로 데이터를 반환하는 getVehiclePathAsync
    async getVehiclePathAsync({
        startX,
        startY,
        endX,
        endY,
        passList,
        reqCoordType = 'WGS84GEO',
        resCoordType = 'WGS84GEO',
    }: TmapRequestParamsType['getVehiclePath']) {
        return postAsync<
            TmapResponseType['getVehiclePath'],
            TmapRequestParamsType['getVehiclePath']
        >(
            '/paths',
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
                baseURL,
                headers: {
                    appKey,
                },
                params: {
                    version: 1,
                    format: 'json',
                },
            },
        );
    },

    // 시작, 종료, 경유지 좌표를 기반으로 보행가 경로 데이터를 반환하는 getPedestrianPathAsync
    async getPedestrianPathAsync({
        startX,
        startY,
        endX,
        endY,
        passList,
        reqCoordType = 'WGS84GEO',
        resCoordType = 'WGS84GEO',
    }: TmapRequestParamsType['getPedestrianPath']) {
        return postAsync<
            TmapResponseType['getPedestrianPath'],
            TmapRequestParamsType['getPedestrianPath']
        >(
            '/paths/pedestrian',
            {
                startX,
                startY,
                endX,
                endY,
                ...(passList && { passList }),
                reqCoordType,
                resCoordType,
                startName: '출발지',
                endName: '종착지',
            },
            {
                baseURL,
                headers: {
                    appKey,
                },
                params: {
                    version: 1,
                    format: 'json',
                },
            },
        );
    },

    // 위경도 좌표를 기반으로 건물 명과 실제 주소를 찾는 getAddressFromLatLng
    async getAddressFromLatLng({
        lat,
        lng,
    }: TmapRequestParamsType['getAddressFromLatLng']) {
        const response = await getAsync<
            TmapResponseType['getAddressFromLatLng']
        >('/geo/reversegeocoding', {
            baseURL,
            headers: { appKey },
            params: {
                version: 1,
                lat,
                lon: lng,
                coordType: 'WGS84GEO',
                addressType: 'A04', // TODO: 논의 후 수정 예정
                callback: 'result',
                keyInfo: 'Y',
            },
        });

        return response.addressInfo;
    },

    // 특정 키워드를 기반으로 POI 검색을 통해 나온 정보를 제공하는 getPoiSearch
    async getPoiSearch({
        keyword,
        radius = 0,
    }: TmapRequestParamsType['getPoiSearch']) {
        const response = await getAsync<TmapResponseType['getPoiSearch']>(
            '/pois',
            {
                baseURL,
                headers: { appKey },
                params: {
                    version: 1,
                    format: 'json',
                    callback: 'result',
                    searchKeyword: keyword,
                    resCoordType: 'WGS84GEO',
                    reqCoordType: 'WGS84GEO',
                    radius,
                    count: 10,
                    searchType: 'all',
                },
            },
        );

        return response.searchPoiInfo.pois.poi;
    },
};
