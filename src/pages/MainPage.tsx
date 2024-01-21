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
        tmapModuleRef.current.removePathInMap();
    }

    return (
        <div>
            <div ref={mapContainerRef} />
            <button onClick={handleTestRoutePath}>draw</button>
            <button onClick={handleTestRemovePath}>remove</button>
        </div>
    );
}

export default MainPage;
