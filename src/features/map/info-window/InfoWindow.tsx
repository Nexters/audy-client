import * as styles from './InfoWindow.css';

interface PropsType {
    name: string;
    address: string;
    // isPinned: boolean;
}

export default function InfoWindow({
    name,
    address,
    // isPinned,
}: PropsType) {
    // TODO: isPinned에 따라서 버튼 스타일 변경

    return (
        <div className={styles.layoutStyle}>
            <div className={styles.windowStyle}>
                <div>
                    <p className={styles.nameStyle}>{name}</p>
                    <p className={styles.addressStyle}>{address}</p>
                </div>
                <button className={styles.buttonStyle}></button>
            </div>
        </div>
    );
}
