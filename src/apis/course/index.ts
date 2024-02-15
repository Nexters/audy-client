import { deleteAsync, getAsync, patchAsync, postAsync } from '@/apis/api';

import type { CourseRequestParamType, CourseResponseType } from './type';

export const CourseRepository = {
    async getCourse(courseId: number) {
        const response = await getAsync<CourseResponseType['getCourse']>(
            `/v1/courses/${courseId}`,
        );
        return response.data;
    },

    async getAllCourses({
        page = 1,
        limit = 10,
    }: CourseRequestParamType['getAllCourses']) {
        const response = await getAsync<CourseResponseType['getAllCourses']>(
            `/v1/courses/all`,
            {
                params: {
                    page,
                    limit,
                },
            },
        );

        return response.data;
    },

    async getOwnedCourses({
        page = 1,
        limit = 10,
    }: CourseRequestParamType['getOwnedCourses']) {
        const response = await getAsync<CourseResponseType['getOwnedCourses']>(
            `/v1/courses/owner`,
            {
                params: {
                    page,
                    limit,
                },
            },
        );

        return response.data;
    },

    async getMemberCourses({
        page = 1,
        limit = 10,
    }: CourseRequestParamType['getOwnedCourses']) {
        const response = await getAsync<CourseResponseType['getMemberCourses']>(
            `/v1/courses/member`,
            {
                params: {
                    page,
                    limit,
                },
            },
        );
        return response.data;
    },

    async postInviteCourse({
        userId,
        courseId,
    }: CourseRequestParamType['postInviteCourse']) {
        return postAsync<
            CourseResponseType['postInviteCourse'],
            CourseRequestParamType['postInviteCourse']
        >('/v1/courses/invite', {
            userId,
            courseId,
        });
    },

    async patchUpdateCourse({
        userId,
        courseId,
        courseName,
    }: CourseRequestParamType['patchUpdateCourse']) {
        return patchAsync<void, CourseRequestParamType['patchUpdateCourse']>(
            '/v1/courses',
            {
                userId,
                courseId,
                courseName,
            },
        );
    },

    async postSaveCourse({
        userId,
        courseName,
    }: CourseRequestParamType['postSaveCourse']) {
        return postAsync<
            CourseResponseType['postSaveCourse'],
            CourseRequestParamType['postSaveCourse']
        >('/v1/courses/invite', {
            userId,
            courseName,
        });
    },

    async deleteCourse({
        userId,
        courseId,
    }: CourseRequestParamType['deleteCourse']) {
        return deleteAsync<void, CourseRequestParamType['deleteCourse']>(
            '/v1/courses',
            {
                userId,
                courseId,
            },
        );
    },
};
