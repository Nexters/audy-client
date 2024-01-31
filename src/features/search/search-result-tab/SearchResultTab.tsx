import AddIcon from '@/assets/icons/add.svg?react';
import CheckIcon from '@/assets/icons/check.svg?react';
import LocationIcon from '@/assets/icons/location.svg?react';

import * as S from './SearchResultTab.css';

interface PropsType {
    name: string;
    address: string;
    isPinned: boolean;
}

const SearchResultTab = ({ name, address, isPinned }: PropsType) => {
    return (
        <div className={S.layout}>
            <div>
                <p className={S.name}>{name}</p>
                <div className={S.addressContainer}>
                    <LocationIcon />
                    <p className={S.address}>{address}</p>
                </div>
            </div>

            <button className={S.pinButton}>
                {isPinned ? <CheckIcon /> : <AddIcon />}
            </button>
        </div>
    );
};

export default SearchResultTab;
