import { useContext, useEffect, useState } from 'react';

import { Reorder } from 'framer-motion';
import { useParams } from 'react-router-dom';

import { SearchContextValue } from '@/features/search/search-context';
import { useDebounce } from '@/hooks/useDebounce';
import { useEventListeners } from '@/hooks/useEventListeners';
import { useSocket } from '@/hooks/useSocket';
import { useTmap } from '@/hooks/useTmap';
import { useGetCourseDetail } from '@/query-hooks/course/query';
import type { MarkerType } from '@/types/map';

import PathItem from '../path-item';

import * as S from './PathView.css';
import PathViewContextProvider from './PathViewContextProvider';

const REORDER_DELAY = 330;

const PathView = () => {
    const { courseId } = useParams();
    const { debounce } = useDebounce();
    const { tmapModule } = useTmap();
    const stompClient = useSocket(Number(courseId));

    const {
        data: { pinResList = [] },
    } = useGetCourseDetail({ courseId: Number(courseId) });

    const [markers, setMarkers] = useState<MarkerType[]>([]);
    const { isSearchMode } = useContext(SearchContextValue);

    useEventListeners('infoWindow:confirm', (event) => {
        if (!courseId) return;
        stompClient.addPin({
            courseId: Number(courseId),
            ...event.detail,
        });
    });

    useEventListeners('infoWindow:revert', (event) => {
        console.log(event.detail);
        const removedMarker = tmapModule?.getMarkerBySequence(event.detail);
        console.log(removedMarker);
        if (!removedMarker) return;
        stompClient.removePin({ pinId: removedMarker.pinId });
    });

    useEventListeners('marker:create', (event) => {
        const updatedMarkers = [...markers, event.detail];
        setMarkers(updatedMarkers);
    });

    useEventListeners('marker:remove', (event) => {
        const updatedMarkers = markers.filter(
            (marker) => marker.pinId !== event.detail,
        );
        setMarkers(updatedMarkers);
    });

    useEffect(() => {
        if (!tmapModule) return;

        const initMarkerList = pinResList
            .map((pin) => tmapModule.createMarker(pin))
            .filter((marker): marker is MarkerType => !!marker);
            
        setMarkers(initMarkerList);
    }, [pinResList, tmapModule]);

    const debouncedModifyMarker = debounce((newOrder: MarkerType[]) => {
        if (!tmapModule) return;

        const modifiedMarkers = newOrder.map((marker, index) => ({
            ...marker,
            sequence: markers[index].sequence,
        }));

        tmapModule.reorderMarkers(modifiedMarkers);
        setMarkers(modifiedMarkers);
    }, REORDER_DELAY);

    const handleReorderMarker = (newOrder: MarkerType[]) => {
        setMarkers(newOrder);
        debouncedModifyMarker(newOrder);
    };

    if (isSearchMode) return null;

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
                        key={marker.pinId}
                        marker={marker}
                        order={index + 1}
                    />
                ))}
            </Reorder.Group>
        </PathViewContextProvider>
    );
};

export default PathView;
