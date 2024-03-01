import type { MutableRefObject, PropsWithChildren } from 'react';
import { createContext, useEffect, useMemo, useRef, useState } from 'react';

import { useLocation } from 'react-router-dom';

import { TMapModule, type TmapConstructorType } from './tmapModule';

interface TmapProviderType {
    mapContainerRef: MutableRefObject<HTMLDivElement | null>;
    tmapModule: TMapModule | null;
}

export const TmapContext = createContext<TmapProviderType>(
    {} as TmapProviderType,
);

interface PropsType extends PropsWithChildren, TmapConstructorType {}

/**
 * 초기 렌더링 시 생성된 TmapModule 인스턴스를 전역에 제공하는 TmapProvider
 */
export const TmapProvider = ({
    mapId = 'tmap',
    width = 640,
    height = 480,
    zoom = 10,
    lat,
    lng,
    children,
}: PropsType) => {
    const [tmapModule, setTmapModule] = useState<TMapModule | null>(null);

    const mapContainerRef = useRef<HTMLDivElement | null>(null);

    const { pathname } = useLocation();

    useEffect(() => {
        if (!mapContainerRef.current) return;

        mapContainerRef.current.id = mapId;
        const tmapModuleInstance = new TMapModule({
            mapId,
            width,
            height,
            zoom,
            lat,
            lng,
        });

        console.log(mapContainerRef.current);
        setTmapModule(tmapModuleInstance);

        return () => setTmapModule(null);
    }, [height, lat, lng, mapId, width, zoom, pathname]);

    const value = useMemo(
        () => ({
            tmapModule,
            mapContainerRef,
        }),
        [tmapModule],
    );

    return (
        <TmapContext.Provider value={value} key={pathname}>
            {children}
        </TmapContext.Provider>
    );
};
