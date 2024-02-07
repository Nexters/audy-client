import clsx from 'clsx';

import AddIcon from '@/assets/icons/add.svg?react';
import InfoWindowLayout from '@/assets/icons/infoWindowLayout.svg?react';
import LocationIcon from '@/assets/icons/location.svg?react';
import TrashCanIcon from '@/assets/icons/trashCan.svg?react';

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
                        <LocationIcon fill="#9CA3AF" width={14} height={14} />
                        <p className={S.address}>{address}</p>
                    </div>
                </div>

                <button
                    className={S.pinButton}
                    id={isPinned ? 'unPinButton' : 'pinButton'}
                >
                    {isPinned ? (
                        <TrashCanIcon fill="#9CA3AF" />
                    ) : (
                        <AddIcon fill="#9CA3AF" />
                    )}
                </button>
            </div>
        </div>
    );
};

export default InfoWindow;
