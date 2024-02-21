import type { QueryClient } from '@tanstack/react-query';
import { LoaderFunctionArgs, redirect } from 'react-router-dom';

import { CourseRepository } from '@/apis/course';
import { COURSE_QUERY_KEY } from '@/query-hooks/course/key';

export const coursePageLoader =
    (queryClient: QueryClient) =>
    async ({ params }: LoaderFunctionArgs) => {
        const courseId = Number(params.courseId);

        if (Number.isNaN(courseId)) redirect('/');

        try {
            return await queryClient.ensureQueryData({
                queryKey: COURSE_QUERY_KEY.detail(courseId),
                queryFn: () => CourseRepository.getCourseAsync(courseId),
            });
        } catch (error) {
            console.log(error);
        }
    };
