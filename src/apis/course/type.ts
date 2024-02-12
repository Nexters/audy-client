import { PaginationType } from "@/types";

export interface CourseRequestParamType {
    getAllCourses: PaginationType;
    getOwnedCourses: PaginationType;
    getMemberCourses: PaginationType;
    postInviteCourse: {
        userId: number;
        courseId: number;
    },
    patchUpdateCourse: {
        userId: number;
        courseId: number;
        courseName: string;
    },
    postSaveCourse: {
        userId: number;
        courseName: number;
    }
}

export interface CourseResponseType {
    getCourse: {
        courseId: number;
        courseName: string;
        pinList: {
            pinId: string;
            pinName: string;
            originName: string;
            latitude: number;
            longitude: number;
            address: string;
            sequence: number;
        }[];
    };
    getAllCourses: {
        courseGetResList: {
            courseId: number;
            courseName: string;
            pinCnt: number;
            editorCnt: number;
            owner: boolean;
        }[];
    };
    getOwnedCourses: {
        courseGetResList: {
            courseId: number;
            courseName: string;
            pinCnt: number;
            editorCnt: number;
            owner: true;
        }[];
    };
    getMemberCourses: {
        courseGetResList: {
            courseId: number;
            courseName: string;
            pinCnt: number;
            editorCnt: number;
            owner: boolean;
        }[];
    };
    postInviteCourse: {
        url: string;
    };
    postSaveCourse: {
        courseId: number;
    }
}
