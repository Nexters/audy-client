import { useEffect, useState } from 'react';

import { Reorder } from 'framer-motion';

import { useDebounce } from '@/hooks/useDebounce';
import { useEventListeners } from '@/hooks/useEventListeners';
import { useTmap } from '@/hooks/useTmap';
import type { MarkerType, PinType } from '@/types/map';

import PathItem from '../path-item';

import * as S from './PathView.css';
import PathViewContextProvider from './PathViewContextProvider';

const REORDER_DELAY = 330;

interface PropsType {
    pinList: PinType[];
}

const PathView = ({ pinList }: PropsType) => {
    const [markers, setMarkers] = useState<MarkerType[]>([]);
    const { tmapModuleRef } = useTmap();

    const { debounce } = useDebounce();

    useEventListeners('marker:create', (event) => {
        setMarkers((previous) => [...previous, event.detail]);
    });

    useEventListeners('marker:remove', (event) => {
        setMarkers(markers.filter((marker) => marker.id !== event.detail));
    });

    useEffect(() => {
        pinList.forEach(({ pinName, pinId, address, latitude, longitude }) => {
            if (!tmapModuleRef.current) return;
            tmapModuleRef.current.createMarker({
                name: pinName,
                originName: pinName,
                address,
                id: pinId,
                lat: String(latitude),
                lng: String(longitude),
            });
        });
    }, [pinList, tmapModuleRef]);

    const debouncedModifyMarker = debounce((newOrder: MarkerType[]) => {
        if (!tmapModuleRef.current) return;
        tmapModuleRef.current.modifyMarker(newOrder);
    }, REORDER_DELAY);

    const handleReorderMarker = (newOrder: MarkerType[]) => {
        setMarkers(newOrder);
        debouncedModifyMarker(newOrder);
    };

    return (
        <PathViewContextProvider>
            <Reorder.Group
                as="section"
                dragListener={false}
                values={markers}
                onReorder={handleReorderMarker}
                axis="y"
                className={S.wrapper}
            >
                {markers.map((marker, index) => (
                    <PathItem
                        key={marker.id}
                        marker={marker}
                        order={index + 1}
                    />
                ))}
            </Reorder.Group>
        </PathViewContextProvider>
    );
};

export default PathView;
