import { useTmap } from '@/hooks/useTmap';

function App() {
    const { mapContainerRef } = useTmap({
        mapId: 'tmap',
        latitude: 37.5652045,
        longitude: 126.98702028,
    });

    return (
        <>
            <div ref={mapContainerRef} />
        </>
    );
}

export default App;
