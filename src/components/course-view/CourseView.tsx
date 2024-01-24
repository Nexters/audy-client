import ListIcon from '@/assets/icons/list.svg?react';
import LocationIcon from '@/assets/icons/location.svg?react';

import * as styles from './CourseView.css';

interface CourseViewProps {
    index: number;
    name: string;
    address: string;
}

const CourseView = ({ index, name, address }: CourseViewProps) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.indexBox}>{index}</div>
            <div className={styles.courseBox}>
                <h5 className={styles.courseName}>{name}</h5>
                <div className={styles.addressBox}>
                    <LocationIcon width={14} height={14} />
                    <p className={styles.address}>{address}</p>
                </div>
            </div>
            <ListIcon className={styles.listIcon} />
        </div>
    );
};

export default CourseView;
