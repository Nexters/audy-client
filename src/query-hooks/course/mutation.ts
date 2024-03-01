import {
    type UseMutationOptions,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { CourseRepository } from '@/apis/course';
import type { CourseRequestParamType } from '@/apis/course/type';

import { COURSE_QUERY_KEY } from './key';

// 특정 코스를 삭제하는 Hook useDeleteCourse
export const useDeleteCourse = ({
    courseId,
    ...options
}: CourseRequestParamType['deleteCourse'] &
    UseMutationOptions<void, AxiosError>) => {
    const queryClient = useQueryClient();
    return useMutation({
        ...options,
        mutationFn: () => CourseRepository.deleteCourseAsync({ courseId }),
        onSuccess: () => {
            queryClient.removeQueries({
                queryKey: COURSE_QUERY_KEY.detail(courseId),
            });
            queryClient.invalidateQueries({
                queryKey: COURSE_QUERY_KEY.list(),
            });
            queryClient.invalidateQueries({
                queryKey: COURSE_QUERY_KEY.owned(),
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
        mutationFn: (courseName: string) =>
            CourseRepository.patchUpdateCourseAsync({ courseId, courseName }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: COURSE_QUERY_KEY.detail(courseId),
            });
            queryClient.invalidateQueries({
                queryKey: COURSE_QUERY_KEY.list(),
            });
        },
        throwOnError: true,
    });
};

// 새로운 코스를 만드는 Hook usePostSaveCourse
export const usePostSaveCourse = ({ ...options }) => {
    const queryClient = useQueryClient();
    return useMutation({
        ...options,
        mutationFn: (courseName: string) =>
            CourseRepository.postSaveCourseAsync({ courseName }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: COURSE_QUERY_KEY.list(),
            });
        },
        throwOnError: true,
    });
};
