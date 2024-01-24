import GlobalNavigationBar from '@/components/global-navigation-bar';
import { useTmap } from '@/hooks/useTmap';

function MainPage() {
    const { tmapModuleRef, mapContainerRef } = useTmap({
        mapId: 'tmap',
        latitude: 37.5652045,
        longitude: 126.98702028,
    });

    const handleTestRoutePath = async () => {
        if (!tmapModuleRef.current) return;
        await tmapModuleRef.current.drawPathBetweenMarkers({
            startIndex: 0,
            endIndex: 2,
        });
    };

    const handleTestRemovePath = () => {
        if (!tmapModuleRef.current) return;
        tmapModuleRef.current.removePath();
    }

    const handleTestTogglePath = () => {
        if (!tmapModuleRef.current) return;
        tmapModuleRef.current.togglePathVisibility();
    }

    return (
        <>
            <GlobalNavigationBar />
            <div>
                <p>test test test test test test</p>
                <div ref={mapContainerRef} />
                <button onClick={handleTestRoutePath}>draw</button>
                <button onClick={handleTestRemovePath}>remove</button>
                <button onClick={handleTestTogglePath}>toggle</button>
            </div>
        </>
    );
}

export default MainPage;
