import { useState } from 'react';

import clsx from 'clsx';

import AddIcon from '@/assets/icons/add.svg?react';
import GlobalNavigationBar from '@/components/global-navigation-bar';
import SidePanel from '@/components/side-panel';
import { useTmap } from '@/hooks/useTmap';

import * as S from './MainPage.css';

type CourseTabType = 'allCourse' | 'myCourse' | 'invitedCourse';

const MainPage = () => {
    const { mapContainerRef } = useTmap();
    const [selectedCourseTab, setSelectedCourseTab] = useState('allCourse');

    const handleCourseTabClick = (tab: CourseTabType) => {
        setSelectedCourseTab(tab);
    };

    const courseTabTypes = ['allCourse', 'myCourse', 'invitedCourse'];
    const courseTabNames = ['모든 코스', '내가 만든 코스', '초대받은 코스'];

    return (
        <>
            <GlobalNavigationBar />

            <div className={S.layout}>
                <SidePanel>
                    <div className={S.courseTypeTabsContainer}>
                        {courseTabTypes.map((tab, index) => (
                            <button
                                key={tab}
                                className={clsx(
                                    S.courseTypeTab,
                                    selectedCourseTab === tab &&
                                        S.selectedCourseTypeTab,
                                )}
                                onClick={() =>
                                    handleCourseTabClick(tab as CourseTabType)
                                }
                            >
                                {courseTabNames[index]}
                            </button>
                        ))}
                    </div>

                    <button className={S.addNewCourseButton}>
                        <AddIcon fill="#000000" width={20} height={20} />
                        <p className={S.addNewCourseButtonText}>
                            새로운 코스 만들기
                        </p>
                    </button>

                    <div></div>
                </SidePanel>

                <div className={S.map} ref={mapContainerRef}></div>
            </div>
        </>
    );
};

export default MainPage;
