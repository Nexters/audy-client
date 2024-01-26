import clsx from 'clsx';

import AddIcon from '@/assets/icons/add.svg?react';
import CheckIcon from '@/assets/icons/check.svg?react';
import InfoWindowLayout from '@/assets/icons/infoWindowLayout.svg?react';
import LocationIcon from '@/assets/icons/location.svg?react';

import * as S from './InfoWindow.css';

interface PropsType {
    name: string;
    address: string;
    isPinned: boolean;
}

const InfoWindow = ({ name, address, isPinned }: PropsType) => {
    return (
        <div
            className={clsx(S.layout, isPinned && S.layoutMargin)}
            id="infoWindow"
        >
            <InfoWindowLayout className={S.window} />

            <div className={S.contentsContainer}>
                <div>
                    <p className={S.name}>{name}</p>
                    <div className={S.addressContainer}>
                        <LocationIcon />
                        <p className={S.address}>{address}</p>
                    </div>
                </div>

                {isPinned ? (
                    <button className={S.disabledButton} disabled>
                        <CheckIcon />
                    </button>
                ) : (
                    <button className={S.pinButton} id="pinButton">
                        <AddIcon />
                    </button>
                )}
            </div>
        </div>
    );
};

export default InfoWindow;
