import { useState } from 'react';

import { Reorder } from 'framer-motion';

import CourseItem from '@/features/course/course-item';
import { useDebounce } from '@/hooks/useDebounce';
import { useEventListeners } from '@/hooks/useEventListeners';
import { useTmap } from '@/hooks/useTmap';
import type { MarkerType } from '@/types/map';

import * as S from './CourseView.css';
import CourseViewContextProvider from './CourseViewContextProvider';

const REORDER_DELAY = 330;

const CourseView = () => {
    const [markers, setMarkers] = useState<MarkerType[]>([]);
    const { tmapModuleRef } = useTmap();

    const { debounce } = useDebounce();

    useEventListeners('marker:create', (event) => {
        setMarkers((previous) => [...previous, event.detail]);
    });

    useEventListeners('marker:remove', (event) => {
        setMarkers(markers.filter((_, index) => index !== event.detail));
    });

    const debouncedModifyMarker = debounce((newOrder: MarkerType[]) => {
        if (!tmapModuleRef.current) return;
        tmapModuleRef.current.modifyMarker(newOrder);
    }, REORDER_DELAY);

    const handleReorderMarker = (newOrder: MarkerType[]) => {
        setMarkers(newOrder);
        debouncedModifyMarker(newOrder);
    };

    return (
        <CourseViewContextProvider>
            <Reorder.Group
                as="section"
                dragListener={false}
                values={markers}
                onReorder={handleReorderMarker}
                axis="y"
                className={S.wrapper}
            >
                {markers.map((marker, index) => (
                    <CourseItem
                        key={marker.id}
                        marker={marker}
                        order={index + 1}
                    />
                ))}
            </Reorder.Group>
        </CourseViewContextProvider>
    );
};

export default CourseView;
