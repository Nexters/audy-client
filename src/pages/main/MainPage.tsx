import { useState } from 'react';

import AddIcon from '@/assets/icons/add.svg?react';
import AsyncBoundary from '@/components/async-boundary';
import GlobalNavigationBar from '@/components/global-navigation-bar';
import SidePanel from '@/components/side-panel';
import CourseFilteringTab from '@/features/course/course-filtering-tab/CourseFilteringTab';
import CoursesContainer from '@/features/course/courses-container';
import MakeNewCourseModal from '@/features/course/make-new-course-modal';
import { useModal } from '@/hooks/useModal';
import { useTmap } from '@/hooks/useTmap';
import { COLOR } from '@/styles/foundation';
import { CourseTabType } from '@/types';

import * as S from './MainPage.css';

const MainPage = () => {
    const { mapContainerRef } = useTmap();
    const { openModal } = useModal();

    const [selectedCourseTab, setSelectedCourseTab] =
        useState<CourseTabType>('allCourse');

    const handleCourseTabClick = (tab: CourseTabType) => {
        setSelectedCourseTab(tab);
    };

    const handleMakeNewCourse = async () => {
        openModal(<MakeNewCourseModal />);
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
                        <AddIcon
                            fill={COLOR.MonoBlack}
                            width={20}
                            height={20}
                        />
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

                <div
                    className={S.map}
                    ref={mapContainerRef}
                    onClickCapture={(event) => event.stopPropagation()}
                />
            </div>
        </>
    );
};

export default MainPage;
