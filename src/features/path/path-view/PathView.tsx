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
    const { isMapLoaded, tmapModule } = useTmap();
    const stompClient = useSocket(Number(courseId));

    const {
        data: { pinResList = [] },
    } = useGetCourseDetail({ courseId: Number(courseId) });

    const [markers, setMarkers] = useState<MarkerType[]>([]);
    const { isSearchMode } = useContext(SearchContextValue);

    useEventListeners('infoWindow:confirm', (event) => {
        if (!courseId) return;
        console.log('created InfoWindow', event.detail);
        stompClient.addPin({
            courseId: Number(courseId),
            ...event.detail,
        });
    });

    useEventListeners('marker:create', (event) => {
        if (!courseId) return;
        const updatedMarkers = [...markers, event.detail];
        updatedMarkers.sort((a, b) => a.sequence - b.sequence);
        setMarkers(updatedMarkers);
    });

    useEventListeners('marker:remove', (event) => {
        if (!courseId) return;
        console.log(event.detail, 'remove');
        stompClient.removePin({ pinId: event.detail });
    });

    useEffect(() => {
        if (!tmapModule) return;

        const initMarkerList: MarkerType[] = pinResList
            .map(({ pinName, pinId, address, latitude, longitude, sequence }) =>
                tmapModule.createMarker({
                    name: pinName,
                    originName: pinName,
                    address,
                    id: pinId,
                    lat: String(latitude),
                    lng: String(longitude),
                    sequence,
                }),
            )
            .filter((marker): marker is MarkerType => !!marker);
        setMarkers(initMarkerList);
    }, [pinResList, tmapModule, isMapLoaded]);

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
