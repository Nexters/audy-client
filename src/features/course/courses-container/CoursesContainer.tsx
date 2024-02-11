import { CourseInformationType } from '@/types/course';

import CourseTab from '../course-tab';

import * as S from './CoursesContainer.css';

interface PropsType {
    courses: CourseInformationType[];
}

const CoursesContainer = ({ courses }: PropsType) => {
    return (
        <div className={S.layout}>
            {courses.map(({ id, name, memberCount, pinCount, isMyCourse }) => (
                <CourseTab
                    key={id}
                    name={name}
                    memberCount={memberCount}
                    pinCount={pinCount}
                    isMyCourse={isMyCourse}
                />
            ))}
        </div>
    );
};

export default CoursesContainer;
