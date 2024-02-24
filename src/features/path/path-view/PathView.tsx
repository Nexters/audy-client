import { useEffect, useState } from 'react';

import { Reorder } from 'framer-motion';
import { useParams } from 'react-router-dom';

import { useDebounce } from '@/hooks/useDebounce';
import { useEventListeners } from '@/hooks/useEventListeners';
import { useSocket } from '@/hooks/useSocket';
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
    const { courseId } = useParams();
    const [markers, setMarkers] = useState<MarkerType[]>([]);
    const { tmapModuleRef } = useTmap();

    const { debounce } = useDebounce();
    const stompClient = useSocket(Number(courseId));

    useEventListeners('marker:create', (event) => {
        if (!courseId) return;
        setMarkers((previous) => [...previous, event.detail]);
        stompClient.addPin({
            pinName: event.detail.name,
            originName: event.detail.originName,
            courseId: Number(courseId),
            latitude: Number(event.detail.lat),
            longitude: Number(event.detail.lng),
            address: event.detail.address,
            sequence: 1, // TODO : TmapModule 구현체 로직 변경 필요
        });
    });

    useEventListeners('marker:remove', (event) => {
        if (!courseId) return;
        setMarkers(markers.filter((marker) => marker.id !== event.detail));
        stompClient.removePin({ pinId: event.detail });
    });

    useEffect(() => {
        const createdMarkerList: MarkerType[] = pinList
            .map(({ pinName, pinId, address, latitude, longitude }) => {
                return tmapModuleRef.current?.createMarker({
                    name: pinName,
                    originName: pinName,
                    address,
                    id: pinId,
                    lat: String(latitude),
                    lng: String(longitude),
                });
            })
            .filter((marker): marker is MarkerType => !!marker);

        setMarkers(createdMarkerList);
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
