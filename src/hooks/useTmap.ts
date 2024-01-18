import { useEffect, useRef } from 'react';

import { TMapModule, type TmapConstructorType } from '@/utils/tmap';

export const useTmap = ({
    mapId = 'tmap',
    width = 640,
    height = 480,
    zoom = 10,
    latitude,
    longitude,
}: TmapConstructorType) => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapModuleRef = useRef<TMapModule | null>(null);

    useEffect(() => {
        if (!mapContainerRef.current) return;

        mapContainerRef.current.id = mapId;
        mapModuleRef.current = new TMapModule({
            mapId,
            width,
            height,
            zoom,
            latitude,
            longitude,
        });
    }, [height, latitude, longitude, mapId, width, zoom]);

    return { mapContainerRef, tmapModule: mapModuleRef.current };
};
