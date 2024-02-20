import {
    QueryKey,
    type UseInfiniteQueryOptions,
    type UseSuspenseQueryOptions,
    useInfiniteQuery,
    useSuspenseQuery,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { CourseRepository } from '@/apis/course';
import type { CourseResponseType } from '@/apis/course/type';
import type { CourseDetailType, CourseType } from '@/types';

import { COURSE_QUERY_KEY } from './key';

// 생성된 코스 목록을 조회하는 Hook useGetCourses
export const useGetCourses = ({
    limit = 10,
    ...options
}: Omit<
    UseInfiniteQueryOptions<
        CourseResponseType['getAllCourses'],
        AxiosError,
        CourseType[],
        CourseResponseType['getAllCourses'],
        QueryKey,
        number
    >,
    'queryKey' | 'initialPageParam' | 'getNextPageParam'
> & { limit: number }) => {
    console.log(options);

    return useInfiniteQuery<
        CourseResponseType['getAllCourses'],
        AxiosError,
        CourseType[],
        QueryKey,
        number
    >({
        ...options,
        queryFn: ({ pageParam }) =>
            CourseRepository.getAllCoursesAsync({ page: pageParam, limit }),
        queryKey: COURSE_QUERY_KEY.list(),
        select: ({ pages }) =>
            pages.reduce<CourseType[]>(
                (previous, { courseGetResList = [] }) => [
                    ...previous,
                    ...courseGetResList,
                ],
                [],
            ),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) =>
            lastPage.isLast ? undefined : allPages.length + 1,
        staleTime: 20 * 1000,
    });
};

// 내가 소유한 코스 목록을 조회하는 Hook useGetOwnCourses
export const useGetOwnCourses = ({
    limit = 10,
    ...options
}: Omit<
    UseInfiniteQueryOptions<
        CourseResponseType['getOwnedCourses'],
        AxiosError,
        CourseType[],
        CourseResponseType['getOwnedCourses'],
        QueryKey,
        number
    >,
    'queryKey' | 'initialPageParam' | 'getNextPageParam'
> & { limit: number }) => {
    return useInfiniteQuery<
        CourseResponseType['getOwnedCourses'],
        AxiosError,
        CourseType[],
        QueryKey,
        number
    >({
        ...options,
        queryFn: ({ pageParam }) =>
            CourseRepository.getOwnedCoursesAsync({ page: pageParam, limit }),
        queryKey: COURSE_QUERY_KEY.owned(),
        select: ({ pages }) =>
            pages.reduce<CourseType[]>(
                (previous, { courseGetResList = [] }) => [
                    ...previous,
                    ...courseGetResList,
                ],
                [],
            ),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) =>
            lastPage.isLast ? undefined : allPages.length + 1,
        staleTime: 20 * 1000,
    });
};

// 내가 소속된 코스 목록을 조회하는 Hook useGetMemberCourses
export const useGetMemberCourses = ({
    limit = 10,
    ...options
}: Omit<
    UseInfiniteQueryOptions<
        CourseResponseType['getMemberCourses'],
        AxiosError,
        CourseType[],
        CourseResponseType['getMemberCourses'],
        QueryKey,
        number
    >,
    'queryKey' | 'initialPageParam' | 'getNextPageParam'
> & { limit: number }) => {
    return useInfiniteQuery<
        CourseResponseType['getMemberCourses'],
        AxiosError,
        CourseType[],
        QueryKey,
        number
    >({
        ...options,
        queryFn: ({ pageParam }) =>
            CourseRepository.getMemberCoursesAsync({ page: pageParam, limit }),
        queryKey: COURSE_QUERY_KEY.member(),
        select: ({ pages }) =>
            pages.reduce<CourseType[]>(
                (previous, { courseGetResList = [] }) => [
                    ...previous,
                    ...courseGetResList,
                ],
                [],
            ),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) =>
            lastPage.isLast ? undefined : allPages.length + 1,
        staleTime: 20 * 1000,
    });
};

// 특정 Course Id 를 가진 코스의 세부 목록을 불러오는 hook useGetCourseDetail
export const useGetCourseDetail = ({
    courseId,
    ...options
}: {
    courseId: number;
    options?: UseSuspenseQueryOptions<CourseDetailType, AxiosError>;
}) => {
    return useSuspenseQuery<CourseDetailType, AxiosError>({
        queryFn: () => CourseRepository.getCourseAsync(courseId),
        queryKey: COURSE_QUERY_KEY.detail(courseId),
        ...options,
    });
};
