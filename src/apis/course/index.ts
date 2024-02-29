import {
    ApiResponseType,
    deleteAsync,
    getAsync,
    patchAsync,
    postAsync,
} from '@/apis/api';

import type { CourseRequestParamType, CourseResponseType } from './type';

export const CourseRepository = {
    async getCourseAsync(courseId: number) {
        const response = await getAsync<
            ApiResponseType<CourseResponseType['getCourse']>
        >(`/v1/courses/${courseId}`);
        return response.data;
    },

    async getAllCoursesAsync({
        page = 1,
        limit = 10,
    }: CourseRequestParamType['getAllCourses']) {
        const response = await getAsync<
            ApiResponseType<CourseResponseType['getAllCourses']>
        >(`/v1/courses/all`, {
            params: {
                page,
                limit,
            },
        });

        return response.data;
    },

    async getOwnedCoursesAsync({
        page = 1,
        limit = 10,
    }: CourseRequestParamType['getOwnedCourses']) {
        const response = await getAsync<
            ApiResponseType<CourseResponseType['getOwnedCourses']>
        >(`/v1/courses/owner`, {
            params: {
                page,
                limit,
            },
        });

        return response.data;
    },

    async getMemberCoursesAsync({
        page = 1,
        limit = 10,
    }: CourseRequestParamType['getOwnedCourses']) {
        const response = await getAsync<
            ApiResponseType<CourseResponseType['getMemberCourses']>
        >(`/v1/courses/member`, {
            params: {
                page,
                limit,
            },
        });
        return response.data;
    },

    async postInviteCourseAsync({
        courseId,
    }: CourseRequestParamType['postInviteCourse']) {
        const response = await postAsync<
            ApiResponseType<CourseResponseType['postInviteCourse']>,
            CourseRequestParamType['postInviteCourse']
        >('/v1/courses/invite', {
            courseId,
        });
        return response.data;
    },

    async patchUpdateCourseAsync({
        courseId,
        courseName,
    }: CourseRequestParamType['patchUpdateCourse']) {
        await patchAsync<
            ApiResponseType<void>,
            CourseRequestParamType['patchUpdateCourse']
        >('/v1/courses', {
            courseId,
            courseName,
        });
    },

    async postSaveCourseAsync({
        courseName,
    }: CourseRequestParamType['postSaveCourse']) {
        const response = await postAsync<
            ApiResponseType<CourseResponseType['postSaveCourse']>,
            CourseRequestParamType['postSaveCourse']
        >('/v1/courses', {
            courseName,
        });
        return response.data;
    },

    async deleteCourseAsync({
        courseId,
    }: CourseRequestParamType['deleteCourse']) {
        await deleteAsync<
            ApiResponseType<void>,
            CourseRequestParamType['deleteCourse']
        >('/v1/courses', {
            courseId,
        });
    },
};
