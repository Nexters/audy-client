import { useContext } from 'react';

import { TmapContext } from '@/utils/tmap/TmapModuleProvider';

/**
 * TmapProvider 로부터 Module, MapContainer RefObject 를 인계 받는 Hook useTmap
 */
export const useTmap = () => {
    const { tmapModuleRef, mapContainerRef } = useContext(TmapContext);
    return { mapContainerRef, tmapModuleRef };
};
