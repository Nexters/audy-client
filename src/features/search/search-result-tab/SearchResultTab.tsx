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
    isPinned: boolean;
}

const SearchResultTab = ({
    name,
    address,
    lat,
    lng,
    id,
    isPinned,
}: PropsType) => {
    const { tmapModuleRef } = useTmap();

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
    };

    const handleTabClick = () => {
        if (!tmapModuleRef.current) return;
        tmapModuleRef.current.zoomIn({ lat, lng });
    };

    return (
        <div className={S.layout} onClick={handleTabClick}>
            <div>
                <p className={S.name}>{name}</p>
                <div className={S.addressContainer}>
                    <LocationIcon />
                    <p className={S.address}>{address}</p>
                </div>
            </div>

            <button className={S.pinButton} onClick={handlePinButtonClick}>
                {isPinned ? <CheckIcon /> : <AddIcon />}
            </button>
        </div>
    );
};

export default SearchResultTab;
