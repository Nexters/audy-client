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
}: CourseRequestParamType['deleteCourse'] & UseMutationOptions<void, AxiosError>) => {
    const queryClient = useQueryClient();
    return useMutation({
        ...options,
        mutationFn: () => CourseRepository.deleteCourseAsync({ userId, courseId }),
        onSuccess: () => {
            queryClient.removeQueries({
                queryKey: COURSE_QUERY_KEY.detail(courseId),
            });
        },
        throwOnError: true,
    });
};

// 코스 이름을 수정하는 Hook usePatchCourseName
export const usePatchCourseName = ({
    courseId,
    ...options
}: { courseId: number } & UseMutationOptions<void, AxiosError, string>) => {
    const queryClient = useQueryClient();
    return useMutation({
        ...options,
        mutationFn: (courseName: string) => CourseRepository.patchUpdateCourseAsync({ courseId, courseName }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: COURSE_QUERY_KEY.detail(courseId),
            });
        },
        throwOnError: true,
    });
};