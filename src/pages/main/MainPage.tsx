import LeftArrowIcon from '@/assets/icons/leftArrow.svg?react';
import ModifyFilledIcon from '@/assets/icons/modifyFilled.svg?react';
import GlobalNavigationBar from '@/components/global-navigation-bar';
import CourseView from '@/features/course/course-view';
import FloatMenu from '@/features/map/float-menu';
import SearchBar from '@/features/search/search-bar';
import { useTmap } from '@/hooks/useTmap';

import * as S from './MainPage.css';

function MainPage() {
    const { mapContainerRef } = useTmap();

    return (
        <>
            <GlobalNavigationBar />
            <div className={S.wrapper}>
                <div className={S.sidePanel}>
                    <div className={S.header}>
                        <LeftArrowIcon
                            width={24}
                            height={24}
                            className={S.backArrowIcon}
                        />
                        <p className={S.courseName}>테스트 코스</p>
                        <ModifyFilledIcon
                            width={24}
                            height={24}
                            className={S.modifyIcon}
                        />
                    </div>
                    <SearchBar />
                    <CourseView />
                </div>
                <div className={S.map} ref={mapContainerRef}>
                    <FloatMenu />
                </div>
            </div>
        </>
    );
}

export default MainPage;
