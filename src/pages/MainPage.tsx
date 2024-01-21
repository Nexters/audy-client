import reactLogo from '@/assets/react.svg';
import { useTmap } from '@/hooks/useTmap';

import viteLogo from '/vite.svg';

function MainPage() {

    const { tmapModuleRef, mapContainerRef } = useTmap({
        mapId: 'tmap',
        latitude: 37.5652045,
        longitude: 126.98702028,
    });

    return (
            <div>
                <div ref={mapContainerRef} />
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img
                        src={reactLogo}
                        className="logo react"
                        alt="React logo"
                    />
                </a>
            </div>
    );
}

export default MainPage;
