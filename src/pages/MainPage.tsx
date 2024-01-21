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
            endIndex: 8,
        });
    };

    return (
        <div>
            <div ref={mapContainerRef} />
            <button onClick={handleTestRoutePath}>test</button>
        </div>
    );
}

export default MainPage;
