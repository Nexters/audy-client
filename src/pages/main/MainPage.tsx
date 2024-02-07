import GlobalNavigationBar from '@/components/global-navigation-bar';
import FloatMenu from '@/features/map/float-menu';
import SidePanel from '@/features/side-panel';
import { useTmap } from '@/hooks/useTmap';

import * as S from './MainPage.css';

function MainPage() {
    const { mapContainerRef } = useTmap();

    return (
        <>
            <GlobalNavigationBar />

            <div className={S.wrapper}>
                <SidePanel />
                <div className={S.map} ref={mapContainerRef}>
                    <FloatMenu />
                </div>
            </div>
        </>
    );
}

export default MainPage;
