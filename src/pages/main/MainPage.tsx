import LeftArrowIcon from '@/assets/icons/leftArrow.svg?react';
import ModifyFilledIcon from '@/assets/icons/modifyFilled.svg?react';
import SearchIcon from '@/assets/icons/search.svg?react';
import GlobalNavigationBar from '@/components/global-navigation-bar';
import CourseView from '@/features/course/course-view';
import FloatMenu from '@/features/map/float-menu';
import { useTmap } from '@/hooks/useTmap';

import * as S from './MainPage.css';

function MainPage() {
    const { mapContainerRef } = useTmap({
        mapId: 'tmap',
        width: '100%',
        height: 'calc(100vh - 64px)',
        lat: 37.5652045,
        lng: 126.98702028,
    });

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
                    <div className={S.searchBox}>
                        <div className={S.searchInner}>
                            <SearchIcon width={20} height={20} />
                            <input
                                className={S.searchInput}
                                placeholder="장소를 입력해주세요."
                            />
                        </div>
                    </div>
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
