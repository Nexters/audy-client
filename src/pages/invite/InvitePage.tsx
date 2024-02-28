import { useEffect, useState } from 'react';

import { useLoaderData, useNavigate } from 'react-router-dom';

import AddIcon from '@/assets/icons/add.svg?react';
import AsyncBoundary from '@/components/async-boundary';
import GlobalNavigationBar from '@/components/global-navigation-bar';
import SidePanel from '@/components/side-panel';
import CourseFilteringTab from '@/features/course/course-filtering-tab/CourseFilteringTab';
import CoursesContainer from '@/features/course/courses-container';
import InvalidLinkModal from '@/features/course/member-limit-modal';
import { useModal } from '@/hooks/useModal';
import { useTmap } from '@/hooks/useTmap';
import { CourseTabType } from '@/types';

import * as S from './InvitePage.css';

const InvitePage = () => {
    const { mapContainerRef } = useTmap();
    const { openModal } = useModal();
    const loadedData = useLoaderData();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(loadedData);
        if (!loadedData) {
            openModal(<InvalidLinkModal />);
            navigate('/');
        }
    }, [loadedData, openModal]);

    const [selectedCourseTab, setSelectedCourseTab] =
        useState<CourseTabType>('allCourse');

    const handleCourseTabClick = (tab: CourseTabType) => {
        setSelectedCourseTab(tab);
    };

    console.log('render');

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

export default InvitePage;
