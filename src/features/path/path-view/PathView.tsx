import { useState } from 'react';

import { Reorder } from 'framer-motion';

import { useDebounce } from '@/hooks/useDebounce';
import { useEventListeners } from '@/hooks/useEventListeners';
import { useTmap } from '@/hooks/useTmap';
import type { PinType, MarkerType } from '@/types/map';

import PathItem from '../path-item';

import * as S from './PathView.css';
import PathViewContextProvider from './PathViewContextProvider';

const REORDER_DELAY = 330;

interface PropsType {
    pinList: PinType[];
}

const PathView = ({ pinList }: PropsType) => {
    const [markers, setMarkers] = useState<PinType[]>(pinList);
    const { tmapModuleRef } = useTmap();

    const { debounce } = useDebounce();

    useEventListeners('marker:create', (event) => {
        setMarkers((previous) => [...previous, event.detail]);
    });

    useEventListeners('marker:remove', (event) => {
        setMarkers(markers.filter((marker) => marker.id !== event.detail));
    });

    const debouncedModifyMarker = debounce((newOrder: PinType[]) => {
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
