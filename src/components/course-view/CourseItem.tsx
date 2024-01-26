import {
    Reorder,
    animate,
    useDragControls,
    useMotionValue,
} from 'framer-motion';

import ListIcon from '@/assets/icons/list.svg?react';
import LocationIcon from '@/assets/icons/location.svg?react';

import * as styles from './CourseItem.css';

interface PropsType {
    course: {
        id: number;
        name: string;
        address: string;
    };
    order: number;
}

const CourseItem = ({ course, order }: PropsType) => {
    const controls = useDragControls();
    const y = useMotionValue(0);

    const onDragEnd = () => {
        animate(y, 0);
    };

    const onPointerDown = (event: React.PointerEvent<SVGSVGElement>) => {
        controls.start(event);
    };

    return (
        <Reorder.Item
            value={course}
            dragListener={false}
            dragControls={controls}
            onDragEnd={onDragEnd}
            style={{ y }}
            className={styles.wrapper}
        >
            <svg width={26} height={26}>
                <rect className={styles.orderBox} rx={4}/>
                <text x='50%' y='50%' className={styles.orderText}>{order}</text>
            </svg>
            <div className={styles.courseBox}>
                <h5 className={styles.courseName}>{course.name}</h5>
                <div className={styles.addressBox}>
                    <LocationIcon width={14} height={14} />
                    <p className={styles.address}>{course.address}</p>
                </div>
            </div>
            <ListIcon
                onPointerDown={onPointerDown}
                className={styles.listIcon}
            />
        </Reorder.Item>
    );
};

export default CourseItem;
