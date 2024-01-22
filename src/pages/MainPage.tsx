import { useTmap } from '@/hooks/useTmap';

function MainPage() {
    const { /*tmapModuleRef, */ mapContainerRef } = useTmap({
        mapId: 'tmap',
        latitude: 37.5652045,
        longitude: 126.98702028,
    });

    return (
        <div>
            <p>test test test test test test</p>
            <div ref={mapContainerRef} />
        </div>
    );
}

export default MainPage;
