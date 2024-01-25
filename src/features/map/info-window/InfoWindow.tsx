import AddIcon from '@/assets/icons/add.svg?react';
import CheckIcon from '@/assets/icons/check.svg?react';
import InfoWindowLayout from '@/assets/icons/infoWindowLayout.svg?react';

import * as styles from './InfoWindow.css';

interface PropsType {
    name: string;
    address: string;
    isPinned: boolean;
}

export default function InfoWindow({ name, address, isPinned }: PropsType) {
    const handlePinButtonClick = () => {};

    const PinButton = () => {
        return (
            <button className={styles.pinButton} onClick={handlePinButtonClick}>
                <AddIcon />
            </button>
        );
    };

    const DisabledButton = () => {
        return (
            <button className={styles.disabledButton} disabled>
                <CheckIcon />
            </button>
        );
    };

    return (
        <div className={`${styles.layout} ${isPinned && styles.layoutMargin}`}>
            <InfoWindowLayout className={styles.window} />

            <div className={styles.contentsContainer}>
                <div>
                    <p className={styles.name}>{name}</p>
                    <p className={styles.address}>{address}</p>
                </div>

                {isPinned ? <DisabledButton /> : <PinButton />}
            </div>
        </div>
    );
}
