import { useEffect, useState } from 'react';

import clsx from 'clsx';

import AddIcon from '@/assets/icons/add.svg?react';
import CheckIcon from '@/assets/icons/check.svg?react';
import LocationIcon from '@/assets/icons/location.svg?react';
import { useTmap } from '@/hooks/useTmap';

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

    const [isPinned, setIsPinned] = useState(false);

    useEffect(() => {
        if (!tmapModuleRef.current) return;

        const pinState = tmapModuleRef.current.checkIsAlreadyPinned({
            address,
            originName: name,
        });

        setIsPinned(pinState);
    }, [address, name]);

    const handlePinButtonClick = () => {
        if (!tmapModuleRef.current) return;

        tmapModuleRef.current.createMarker({
            name,
            originName: name,
            address,
            id,
            lat,
            lng,
        });

        tmapModuleRef.current.drawPathBetweenMarkers({});

        const pinState = tmapModuleRef.current.checkIsAlreadyPinned({
            address,
            originName: name,
        });

        setIsPinned(pinState);
    };

    const handleTabClick = () => tmapModuleRef.current?.zoomIn({ lat, lng });

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
                    <CheckIcon fill="#1E1BFF" />
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
