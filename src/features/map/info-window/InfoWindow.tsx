import * as styles from './InfoWindow.css';

interface PropsType {
    name: string;
    address: string;
    isPinned: boolean;
}

export default function InfoWindow({ name, address, isPinned }: PropsType) {
    const handlePinButtonClick = () => {};

    return (
        <div className={styles.layoutStyle}>
            <div className={styles.windowStyle}>
                <div>
                    <p className={styles.nameStyle}>{name}</p>
                    <p className={styles.addressStyle}>{address}</p>
                </div>
                <button
                    className={styles.buttonStyle}
                    onClick={handlePinButtonClick}
                ></button>
            </div>
        </div>
    );
}
