import { useState } from 'react';

import clsx from 'clsx';

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

    const handlePinButtonClick = () => {
        if (!tmapModule) return;

        tmapModule.createMarker({
            name,
            originName: name,
            address,
            id,
            lat,
            lng,
        });

        tmapModule.drawPathBetweenMarkers();
        setIsPinned(true);
    };

    const handleTabClick = () => tmapModule?.zoomIn({ lat, lng });

    return (
        <div className={S.layout} onClick={handleTabClick}>
            <div>
                <p className={S.name}>{name}</p>
                <div className={S.addressContainer}>
                    <LocationIcon />
                    <p className={S.address}>{address}</p>
                </div>
            </div>

            {isPinned ? (
                <button className={clsx(S.pinButton, S.alreadyPinned)} disabled>
                    <CheckIcon fill={COLOR.IndigoPrimary} />
                </button>
            ) : (
                <button className={S.pinButton} onClick={handlePinButtonClick}>
                    <AddIcon />
                </button>
            )}
        </div>
    );
};

export default SearchResultTab;
