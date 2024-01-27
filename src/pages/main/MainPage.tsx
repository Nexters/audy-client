import LeftArrowIcon from '@/assets/icons/leftArrow.svg?react';
import ModifyFilledIcon from '@/assets/icons/modifyFilled.svg?react';
import SearchIcon from '@/assets/icons/search.svg?react';
import GlobalNavigationBar from '@/components/global-navigation-bar';
import CourseView from '@/features/course/course-view';
import { useTmap } from '@/hooks/useTmap';

import * as styles from './MainPage.css';

function MainPage() {
    const { mapContainerRef, tmapModuleRef } = useTmap({
        mapId: 'tmap',
        width: '100%',
        height: 'calc(100vh - 64px)',
        lat: 37.5652045,
        lng: 126.98702028,
    });

    const tmapModule = tmapModuleRef.current;

    const markers = tmapModule?.getMarkers() ?? [];

    console.log(markers);

    return (
        <>
            <GlobalNavigationBar />
            <div className={styles.wrapper}>
                <div className={styles.sidePanel}>
                    <div className={styles.header}>
                        <LeftArrowIcon
                            width={24}
                            height={24}
                            className={styles.backArrowIcon}
                        />
                        <p className={styles.courseName}>테스트 코스</p>
                        <ModifyFilledIcon
                            width={24}
                            height={24}
                            className={styles.modifyIcon}
                        />
                    </div>
                    <div className={styles.searchBox}>
                        <div className={styles.searchInner}>
                            <SearchIcon width={20} height={20} />
                            <input
                                className={styles.searchInput}
                                placeholder="장소를 입력해주세요."
                            />
                        </div>
                    </div>
                    <CourseView markers={markers}/>
                </div>
                <div className={styles.map} ref={mapContainerRef} />
            </div>
        </>
    );
}

export default MainPage;
