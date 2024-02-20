import {
    QueryKey,
    type UseInfiniteQueryOptions,
    useInfiniteQuery,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { TmapRepository } from '@/apis/tmap';
import type { TmapResponseType } from '@/apis/tmap/type';
import type { SearchResultType } from '@/types';

import { SEARCH_QUERY_KEY } from './key';

// 생성된 코스 목록을 조회하는 Hook useGetCourses
export const useGetSearchPois = ({
    keyword,
    limit = 10,
    ...options
}: Omit<
    UseInfiniteQueryOptions<
        TmapResponseType['getPoiSearch'],
        AxiosError,
        SearchResultType[],
        TmapResponseType['getPoiSearch'],
        QueryKey,
        number
    >,
    'queryKey' | 'initialPageParam' | 'getNextPageParam'
> & { keyword: string; limit?: number }) => {
    return useInfiniteQuery<
        TmapResponseType['getPoiSearch'],
        AxiosError,
        SearchResultType[],
        QueryKey,
        number
    >({
        ...options,
        queryFn: ({ pageParam }) =>
            TmapRepository.getPoiSearchAsync({ keyword, page: pageParam, limit }),
        queryKey: SEARCH_QUERY_KEY.pois(keyword),
        select: ({ pages }) =>
            pages.reduce<SearchResultType[]>(
                (previous, current) => [
                    ...previous,
                    ...current.searchPoiInfo.pois.poi,
                ],
                [],
            ),
        initialPageParam: 1,
        getNextPageParam: ({ totalCount, page, count }) =>
            totalCount > page * count  ? undefined : page + 1,
        staleTime: 20 * 1000,
        enabled: !!keyword,
    });
};
