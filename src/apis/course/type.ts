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
        courseName: string;
    };
    deleteCourse: {
        courseId: number;
    };
}

export interface CourseResponseType {
    getCourse: CourseDetailType;
    getAllCourses: {
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

export interface CourseSocketPubType {
    addition: {
        courseId: number;
        pinName: string;
        originName: string;
        latitude: string;
        longitude: string;
        address: string;
        sequence: string;
    };
    modifyName: {
        pinId: string;
        pinName: string;
    };
    modifySequence: {
        pinId: string;
        order: number;
    };
    removal: {
        pinId: string;
    };
}

export interface CourseSocketSubType {
    addition: {
        courseId: number;
        pinId: string;
        pinName: string;
        originName: string;
        latitude: string;
        longitude: string;
        address: string;
        sequence: string;
    };
    modifyName: {
        pinId: string;
        pinName: string;
    };
    modifySequence: {
        pinId: string;
        sequence: string;
    };
    removal: {
        pinId: string;
    };
}
