import { useState } from 'react';

import AddIcon from '@/assets/icons/add.svg?react';
import GlobalNavigationBar from '@/components/global-navigation-bar';
import SidePanel from '@/components/side-panel';
import CourseFilteringTab from '@/features/course/course-filtering-tab/CourseFilteringTab';
import CoursesContainer from '@/features/course/courses-container';
import { useTmap } from '@/hooks/useTmap';
import { COLOR } from '@/styles/foundation';
import { CourseTabType } from '@/types';

import * as S from './MainPage.css';

const MainPage = () => {
    const { mapContainerRef } = useTmap();

    const [selectedCourseTab, setSelectedCourseTab] =
        useState<CourseTabType>('allCourse');

    const handleCourseTabClick = (tab: CourseTabType) => {
        setSelectedCourseTab(tab);
    };

    const tempCourses = [
        {
            id: '1',
            name: '테스트 코스',
            memberCount: 3,
            pinCount: 5,
            isMyCourse: true,
        },
        {
            id: '2',
            name: '테스트 코스2',
            memberCount: 3,
            pinCount: 5,
            isMyCourse: false,
        },
    ];

    return (
        <>
            <GlobalNavigationBar />

            <div className={S.layout}>
                <SidePanel>
                    <CourseFilteringTab
                        selectedCourseTab={selectedCourseTab}
                        handleCourseTabClick={handleCourseTabClick}
                    />

                    <button className={S.addNewCourseButton}>
                        <AddIcon
                            fill={COLOR.MonoBlack}
                            width={20}
                            height={20}
                        />
                        <p className={S.addNewCourseButtonText}>
                            새로운 코스 만들기
                        </p>
                    </button>

                    <CoursesContainer courses={tempCourses} />
                </SidePanel>

                <div className={S.map} ref={mapContainerRef} />
            </div>
        </>
    );
};

export default MainPage;
