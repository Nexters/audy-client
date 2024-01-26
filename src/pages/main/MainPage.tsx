import GlobalNavigationBar from '@/components/global-navigation-bar';
import CourseView from '@/features/course/course-view';
import { useTmap } from '@/hooks/useTmap';

import * as styles from './MainPage.css';

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
            <div className={styles.wrapper}>
                <div className={styles.sidePanel}>
                    <CourseView />
                </div>
                <div className={styles.map} ref={mapContainerRef} />
            </div>
        </>
    );
}

export default MainPage;
