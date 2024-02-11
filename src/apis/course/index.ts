import { deleteAsync, getAsync, patchAsync, postAsync } from '@/apis/api';

import type { CourseRequestParamType, CourseResponseType } from './type';

export const CourseRepository = {
    async getCourse(courseId: number) {
        return getAsync<CourseResponseType['getCourse']>(
            `/v1/courses/${courseId}`,
        );
    },

    async getAllCourses(courseId: number) {
        return getAsync<CourseResponseType['getAllCourses']>(
            `/v1/courses/${courseId}`,
        );
    },

    async getOwnedCourses() {
        return getAsync<CourseResponseType['getOwnedCourses']>(
            `/v1/courses/owner`,
        );
    },

    async getMemberCourses() {
        return getAsync<CourseResponseType['getMemberCourses']>(
            `/v1/courses/member`,
        );
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
};
