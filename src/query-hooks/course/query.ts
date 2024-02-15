import {
    QueryKey,
    type UseSuspenseInfiniteQueryOptions,
    type UseSuspenseQueryOptions,
    useSuspenseInfiniteQuery,
    useSuspenseQuery,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { CourseRepository } from '@/apis/course';
import type { CourseResponseType } from '@/apis/course/type';
import type { CourseDetailType, CourseType } from '@/types';

import { COURSE_QUERY_KEY } from './key';

// 생성된 코스 목록을 조회하는 Hook useGetCourseList
export const useGetCourseList = ({
    limit = 10,
    ...options
}: {
    limit?: number;
    options: UseSuspenseInfiniteQueryOptions<
        CourseResponseType['getAllCourses'],
        AxiosError,
        CourseType[],
        CourseType[]
    >;
}) => {
    return useSuspenseInfiniteQuery<
        CourseResponseType['getAllCourses'],
        AxiosError,
        CourseType[],
        QueryKey,
        number
    >({
        ...options,
        queryFn: ({ pageParam }) =>
            CourseRepository.getAllCourses({ page: pageParam, limit }),
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
    });
};

// 내가 소유한 코스 목록을 조회하는 Hook useGetOwnCourseList
export const useGetOwnCourseList = ({
    limit = 10,
    ...options
}: {
    limit?: number;
    options: UseSuspenseInfiniteQueryOptions<
        CourseResponseType['getOwnedCourses'],
        AxiosError,
        CourseType[],
        CourseType[]
    >;
}) => {
    return useSuspenseInfiniteQuery<
        CourseResponseType['getOwnedCourses'],
        AxiosError,
        CourseType[],
        QueryKey,
        number
    >({
        ...options,
        queryFn: ({ pageParam }) =>
            CourseRepository.getOwnedCourses({ page: pageParam, limit }),
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
    });
};

// 내가 소속된 코스 목록을 조회하는 Hook useGetMemberCourseList
export const useGetMemberCourseList = ({
    limit = 10,
    ...options
}: {
    limit?: number;
    options: UseSuspenseInfiniteQueryOptions<
        CourseResponseType['getMemberCourses'],
        AxiosError,
        CourseType[],
        CourseType[]
    >;
}) => {
    return useSuspenseInfiniteQuery<
        CourseResponseType['getMemberCourses'],
        AxiosError,
        CourseType[],
        QueryKey,
        number
    >({
        ...options,
        queryFn: ({ pageParam }) =>
            CourseRepository.getMemberCourses({ page: pageParam, limit }),
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
    });
};

// 특정 Course Id 를 가진 코스의 세부 목록을 불러오는 hook useGetCourseDetail
export const useGetCourseDetail = ({
    courseId,
    ...options
}: {
    courseId: number;
    options: UseSuspenseQueryOptions<CourseDetailType, AxiosError>;
}) => {
    return useSuspenseQuery<CourseDetailType, AxiosError>({
        queryFn: () => CourseRepository.getCourse(courseId),
        queryKey: COURSE_QUERY_KEY.detail(courseId),
        ...options,
    });
};
