import {
    useGetCourses,
    useGetMemberCourses,
    useGetOwnCourses,
} from '@/query-hooks/course/query';
import type { CourseTabType, CourseType } from '@/types/course';

import CourseTab from '../course-tab';

import * as S from './CoursesContainer.css';

interface PropsType {
    selectedCourseTab: CourseTabType;
}

const CoursesContainer = ({ selectedCourseTab }: PropsType) => {
    const { data: wholeCourses } = useGetCourses({ limit: 10 });
    const { data: ownedCourses } = useGetOwnCourses({ limit: 10 });
    const { data: invitedCourses } = useGetMemberCourses({ limit: 10 });

    const selectedCourseMap = new Map<CourseTabType, CourseType[]>([
        ['allCourse', wholeCourses],
        ['myCourse', ownedCourses],
        ['invitedCourse', invitedCourses],
    ]);

    const selectedCourse = selectedCourseMap.get(selectedCourseTab) ?? [];

    return (
        <div className={S.layout}>
            {selectedCourse.map(({ courseId, courseName, editorCnt, pinCnt, owner }) => (
                <CourseTab
                    key={courseId}
                    courseName={courseName}
                    memberCount={editorCnt}
                    pinCount={pinCnt}
                    isMyCourse={owner}
                />
            ))}
        </div>
    );
};

export default CoursesContainer;
