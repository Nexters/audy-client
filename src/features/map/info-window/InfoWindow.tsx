import AddIcon from '@/assets/icons/add.svg?react';
import CheckIcon from '@/assets/icons/check.svg?react';
import InfoWindowLayout from '@/assets/icons/infoWindowLayout.svg?react';
import LocationIcon from '@/assets/icons/location.svg?react';

import * as styles from './InfoWindow.css';

interface PropsType {
    name: string;
    address: string;
    isPinned: boolean;
}

export default function InfoWindow({ name, address, isPinned }: PropsType) {
    const handlePinButtonClick = () => {};

    return (
        <div className={`${styles.layout} ${isPinned && styles.layoutMargin}`}>
            <InfoWindowLayout className={styles.window} />

            <div className={styles.contentsContainer}>
                <div>
                    <p className={styles.name}>{name}</p>
                    <div className={styles.addressContainer}>
                        <LocationIcon />
                        <p className={styles.address}>{address}</p>
                    </div>
                </div>

                {isPinned ? (
                    <button className={styles.disabledButton} disabled>
                        <CheckIcon />
                    </button>
                ) : (
                    <button
                        className={styles.pinButton}
                        onClick={handlePinButtonClick}
                    >
                        <AddIcon />
                    </button>
                )}
            </div>
        </div>
    );
}