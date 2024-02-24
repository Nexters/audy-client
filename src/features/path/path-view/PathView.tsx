import { useContext, useEffect, useState } from 'react';

import { Reorder } from 'framer-motion';
import { useParams } from 'react-router-dom';

import { SearchContextValue } from '@/features/search/search-context';
import { useDebounce } from '@/hooks/useDebounce';
import { useEventListeners } from '@/hooks/useEventListeners';
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
    const { tmapModuleRef } = useTmap();

    const {
        data: { pinList = [] },
    } = useGetCourseDetail({ courseId: Number(courseId) });

    const [markers, setMarkers] = useState<MarkerType[]>([]);
    const { isSearchMode } = useContext(SearchContextValue);

    useEventListeners('marker:create', (event) => {
        setMarkers((previous) => [...previous, event.detail]);
    });

    useEventListeners('marker:remove', (event) => {
        setMarkers(markers.filter((marker) => marker.id !== event.detail));
    });

    useEffect(() => {
        if (!tmapModuleRef.current) return;
        const initMarkerList: MarkerType[] = pinList
            .map(({ pinName, pinId, address, latitude, longitude }) =>
                tmapModuleRef.current?.createMarker({
                    name: pinName,
                    originName: pinName,
                    address,
                    id: pinId,
                    lat: String(latitude),
                    lng: String(longitude),
                }),
            )
            .filter((marker): marker is MarkerType => !!marker);
        setMarkers(initMarkerList);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const debouncedModifyMarker = debounce((newOrder: MarkerType[]) => {
        if (!tmapModuleRef.current) return;
        tmapModuleRef.current.modifyMarker(newOrder);
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
