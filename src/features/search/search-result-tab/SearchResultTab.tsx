import { useState } from 'react';

import AddIcon from '@/assets/icons/add.svg?react';
import LocationIcon from '@/assets/icons/location.svg?react';
import TrashCanIcon from '@/assets/icons/trashCan.svg?react';
import { useEventListeners } from '@/hooks/useEventListeners';
import { useTmap } from '@/hooks/useTmap';
import { COLOR } from '@/styles/foundation';

import * as S from './SearchResultTab.css';

interface PropsType {
    name: string;
    address: string;
    lat: string;
    lng: string;
    id: string;
}

const SearchResultTab = ({ name, address, lat, lng, id }: PropsType) => {
    const { tmapModuleRef } = useTmap();

    const tmapModule = tmapModuleRef.current;
    const initialPinState = !!tmapModule?.getMarkerById(id);

    const [isPinned, setIsPinned] = useState(initialPinState);

    useEventListeners('marker:remove', (event) => {
        if (event.detail === id) setIsPinned(false);
    });

    const handleUnPinButtonClick = () => {
        if (!tmapModule) return;

        tmapModule.removeMarker(id);
        setIsPinned(false);
    };

    const handlePinButtonClick = (event: React.MouseEvent) => {
        if (!tmapModule) return;

        event.stopPropagation();

        tmapModule.createMarker({
            name,
            originName: name,
            address,
            id,
            lat,
            lng,
        });

        tmapModule.createInfoWindow({
            lat,
            lng,
            name,
            address,
            id,
            isPinned: true,
        });

        setIsPinned(true);
    };

    const handleTabClick = () => {
        if (!tmapModule) return;

        tmapModule.createInfoWindow({
            lat,
            lng,
            name,
            address,
            id,
            isPinned: false,
        });

        tmapModule.zoomIn({ lat, lng });
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
