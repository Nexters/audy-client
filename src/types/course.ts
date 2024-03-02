import type { EditorType } from './editor';
import type { PinType } from './map';

export interface CourseInformationType {
    id: string;
    name: string;
    memberCount: number;
    pinCount: number;
    isMyCourse: boolean;
} // TODO: 임시 (백엔드 논의 후 수정 필요)

export interface CourseType {
    courseId: number;
    courseName: string;
    pinCnt: number;
    editorCnt: number;
    owner: boolean;
}

export interface CourseDetailType {
    courseId: number;
    courseName: string;
    editorCnt: number;
    editorGetResList: EditorType[];
    pinCnt: number;
    pinResList: PinType[];
}

export type CourseTabType = 'allCourse' | 'myCourse' | 'invitedCourse';
