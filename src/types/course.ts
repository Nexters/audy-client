export interface CourseInformationType {
    id: string;
    name: string;
    memberCount: number;
    pinCount: number;
    isMyCourse: boolean;
} // TODO: 임시 (백엔드 논의 후 수정 필요)

export type CourseTabType = 'allCourse' | 'myCourse' | 'invitedCourse';
