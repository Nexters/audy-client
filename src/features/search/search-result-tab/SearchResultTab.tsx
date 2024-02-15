import { useState } from 'react';

import clsx from 'clsx';

import AddIcon from '@/assets/icons/add.svg?react';
import CheckIcon from '@/assets/icons/check.svg?react';
import LocationIcon from '@/assets/icons/location.svg?react';
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
    const pinState = tmapModule?.checkIsAlreadyPinned(id);

    const [isPinned, setIsPinned] = useState(pinState);

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
        tmapModule?.createInfoWindow({
            lat,
            lng,
            name,
            address,
            id,
            isPinned: false,
        });
        tmapModule?.zoomIn({ lat, lng });
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

            {isPinned ? (
                <button className={clsx(S.pinButton, S.alreadyPinned)} disabled>
                    <CheckIcon fill={COLOR.IndigoPrimary} />
                </button>
            ) : (
                <button className={S.pinButton} onClick={handlePinButtonClick}>
                    <AddIcon fill={COLOR.Gray400} />
                </button>
            )}
        </div>
    );
};

export default SearchResultTab;
