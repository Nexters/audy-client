import { useState } from 'react';

import { LexoRank } from 'lexorank';
import { useParams } from 'react-router-dom';

import AddIcon from '@/assets/icons/add.svg?react';
import LocationIcon from '@/assets/icons/location.svg?react';
import TrashCanIcon from '@/assets/icons/trashCan.svg?react';
import { useEventListeners } from '@/hooks/useEventListeners';
import { useSocket } from '@/hooks/useSocket';
import { useTmap } from '@/hooks/useTmap';
import { COLOR } from '@/styles/foundation';

import * as S from './SearchResultTab.css';

interface PropsType {
    name: string;
    address: string;
    latitude: string;
    longitude: string;
    pKey: string;
}

const SearchResultTab = ({
    name,
    address,
    latitude,
    longitude,
    pKey,
}: PropsType) => {
    const { courseId } = useParams();
    const { tmapModule } = useTmap();
    const stompClient = useSocket(Number(courseId));

    const initialPinState = !!tmapModule?.getMarkerByLatLng({
        latitude,
        longitude,
    });

    const [isPinned, setIsPinned] = useState(initialPinState);

    useEventListeners('marker:remove', (event) => {
        const removedMarker = tmapModule?.getMarkerById(event.detail);
        if (
            removedMarker?.latitude === latitude &&
            removedMarker?.longitude === longitude
        )
            setIsPinned(false);
    });

    const handleUnPinButtonClick = () => {
        const removedMarker = tmapModule?.getMarkerByLatLng({
            latitude,
            longitude,
        });
        if (!removedMarker) return;

        stompClient.removePin({ pinId: removedMarker.pinId });
        setIsPinned(false);
    };

    const handlePinButtonClick = (event: React.MouseEvent) => {
        if (!tmapModule || !courseId) return;
        event.stopPropagation();

        const latestSequence = tmapModule.getMarkers().at(-1)?.sequence;
        const currentSequence = latestSequence
            ? LexoRank.parse(latestSequence).genNext().toString()
            : LexoRank.min().toString();

        stompClient.addPin({
            courseId: Number(courseId),
            pinName: name,
            originName: name,
            latitude,
            longitude,
            address,
            sequence: currentSequence,
        });

        tmapModule.createInfoWindow({
            latitude,
            longitude,
            pinId: pKey, // FIXME : 검색 결과로 들어온 ID 는 실제 서버에서 발급한 pinId 와 관련이 없음, 개선 필요
            pinName: name,
            address,
            isPinned: true,
        });

        setIsPinned(true);
    };

    const handleTabClick = () => {
        if (!tmapModule) return;

        tmapModule.createInfoWindow({
            latitude,
            longitude,
            pinId: pKey, // FIXME : 검색 결과로 들어온 ID 는 실제 서버에서 발급한 pinId 와 관련이 없음, 개선 필요
            pinName: name,
            address,
            isPinned: false,
        });

        tmapModule.zoomIn({ latitude, longitude });
    };

    return (
        <div className={S.layout} onClick={handleTabClick}>
            <div>
                <p className={S.name}>{name}</p>
                <div className={S.addressContainer}>
                    <LocationIcon fill={COLOR.Gray400} width={14} height={14} />
                    <p className={S.address}>{address}</p>
                </div>
            </div>

            <button
                className={S.pinButton}
                onClick={
                    isPinned ? handleUnPinButtonClick : handlePinButtonClick
                }
            >
                {isPinned ? <TrashCanIcon /> : <AddIcon />}
            </button>
        </div>
    );
};

export default SearchResultTab;
