import type { CourseDetailType, CourseType, PaginationType } from '@/types';

export interface CourseRequestParamType {
    getAllCourses: PaginationType;
    getOwnedCourses: PaginationType;
    getMemberCourses: PaginationType;
    postInviteCourse: {
        courseId: number;
    };
    patchUpdateCourse: {
        courseId: number;
        courseName: string;
    };
    postSaveCourse: {
        courseName: number;
    };
    deleteCourse: {
        userId: number;
        courseId: number;
    };
}

export interface CourseResponseType {
    getCourse: CourseDetailType;
    getAllCourses:{
        courseGetResList: CourseType[];
        isLast: boolean;
    };
    getOwnedCourses: {
        courseGetResList: CourseType[];
        isLast: boolean;
    };
    getMemberCourses: {
        courseGetResList: CourseType[];
        isLast: boolean;
    };
    postInviteCourse: {
        url: string;
    };
    postSaveCourse: {
        courseId: number;
    };
}
