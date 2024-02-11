import clsx from 'clsx';

import { CourseTabType } from '@/types';

import * as S from './CourseFilteringTab.css';

interface PropsType {
    selectedCourseTab: CourseTabType;
    handleCourseTabClick: (tab: CourseTabType) => void;
}

const CourseFilteringTab = ({
    selectedCourseTab,
    handleCourseTabClick,
}: PropsType) => {
    const courseTabTypes = ['allCourse', 'myCourse', 'invitedCourse'];
    const courseTabNames = ['모든 코스', '내가 만든 코스', '초대받은 코스'];

    return (
        <div className={S.layout}>
            {courseTabTypes.map((tab, index) => (
                <button
                    key={tab}
                    className={clsx(
                        S.courseTypeTab,
                        selectedCourseTab === tab && S.selectedCourseTypeTab,
                    )}
                    onClick={() => handleCourseTabClick(tab as CourseTabType)}
                >
                    {courseTabNames[index]}
                </button>
            ))}
        </div>
    );
};

export default CourseFilteringTab;
