import { type UseMutationOptions, useMutation, useQueryClient } from '@tanstack/react-query';

import { CourseRepository } from '@/apis/course';
import type { CourseRequestParamType } from '@/apis/course/type';
import type { AxiosError } from 'axios';
import { COURSE_QUERY_KEY } from './key';

// 특정 코스를 삭제하는 Hook useDeleteCourse
export const useDeleteCourse = ({
    userId,
    courseId,
    ...options
}: CourseRequestParamType['deleteCourse'] & UseMutationOptions<unknown, AxiosError>) => {
    const queryClient = useQueryClient();
    return useMutation({
        ...options,
        mutationFn: () => CourseRepository.deleteCourse({ userId, courseId }),
        onSuccess: () => {
            queryClient.removeQueries({
                queryKey: COURSE_QUERY_KEY.detail(courseId),
            });
        },
        throwOnError: true,
    });
};

// 코스 정보를 수정하는 Hook usePatchCourse
export const usePatchCourse = ({
    userId,
    courseId,
    courseName,
    ...options
}: CourseRequestParamType['patchUpdateCourse'] & UseMutationOptions<unknown, AxiosError>) => {
    const queryClient = useQueryClient();
    return useMutation({
        ...options,
        mutationFn: () => CourseRepository.patchUpdateCourse({ courseId, userId, courseName }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: COURSE_QUERY_KEY.detail(courseId),
            });
        },
        throwOnError: true,
    });
};