import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import AddIcon from '@/assets/icons/add.svg?react';
import AsyncBoundary from '@/components/async-boundary';
import GlobalNavigationBar from '@/components/global-navigation-bar';
import SidePanel from '@/components/side-panel';
import CourseFilteringTab from '@/features/course/course-filtering-tab/CourseFilteringTab';
import CoursesContainer from '@/features/course/courses-container';
import { useTmap } from '@/hooks/useTmap';
import { usePostSaveCourse } from '@/query-hooks/course/mutation';
import { useGetUserInformation } from '@/query-hooks/user/query';
import { CourseTabType } from '@/types';

import * as S from './MainPage.css';

const MainPage = () => {
    const { mapContainerRef } = useTmap();
    const navigate = useNavigate();

    const { data: userInformation } = useGetUserInformation({});
    const { mutateAsync: makeNewCourse } = usePostSaveCourse({
        userId: userInformation.userId,
    });

    const [selectedCourseTab, setSelectedCourseTab] =
        useState<CourseTabType>('allCourse');

    const handleCourseTabClick = (tab: CourseTabType) => {
        setSelectedCourseTab(tab);
    };

    const handleMakeNewCourse = async () => {
        const response = await makeNewCourse('새로운 코스');
        navigate(`/course/${response.data.courseId}`);
    };

    return (
        <>
            <GlobalNavigationBar />

            <div className={S.layout}>
                <SidePanel>
                    <CourseFilteringTab
                        selectedCourseTab={selectedCourseTab}
                        handleCourseTabClick={handleCourseTabClick}
                    />

                    <button
                        className={S.addNewCourseButton}
                        onClick={handleMakeNewCourse}
                    >
                        <AddIcon fill="#000000" width={20} height={20} />
                        <p className={S.addNewCourseButtonText}>
                            새로운 코스 만들기
                        </p>
                    </button>

                    <AsyncBoundary>
                        <CoursesContainer
                            selectedCourseTab={selectedCourseTab}
                        />
                    </AsyncBoundary>
                </SidePanel>

                <div className={S.map} ref={mapContainerRef} />
            </div>
        </>
    );
};

export default MainPage;
