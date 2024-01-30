import { useState } from 'react';

import { Reorder } from 'framer-motion';

import CourseItem from '@/features/course/course-item';
import { useEventListeners } from '@/hooks/useEventListeners';
import type { MarkersType } from '@/types/map';

import * as S from './CourseView.css';
import CourseViewContextProvider from './CourseViewContextProvider';

const CourseView = () => {
    const [markers, setMarkers] = useState<MarkersType[]>([]);

    useEventListeners('modifyMarkers', (event) => {
        setMarkers([...event.detail]);
    });

    const handleReorderMarker = (newOrder: MarkersType[]) => {
        window.dispatchEvent(
            new CustomEvent('reorderMarkers', { detail: newOrder }),
        );
        setMarkers(newOrder);
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
