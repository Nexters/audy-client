import { useState } from 'react';

import {
    Reorder,
    animate,
    useDragControls,
    useMotionValue,
} from 'framer-motion';

import ListIcon from '@/assets/icons/list.svg?react';
import LocationIcon from '@/assets/icons/location.svg?react';
import { dummyCourseList } from '@/constants/dummy';

import * as styles from './CourseView.css';

interface CourseViewProps {
    course: {
        id: number;
        name: string;
        address: string;
    };
    index: number;
}

const CourseView = () => {
    const [courseViews, setCourseViews] = useState(dummyCourseList);

    return (
        <Reorder.Group values={courseViews} onReorder={setCourseViews} axis="y">
            {courseViews.map((course, index) => (
                <Course key={course.id} course={course} index={index} />
            ))}
        </Reorder.Group>
    );
};

const Course = ({ course, index }: CourseViewProps) => {
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
            <div className={styles.indexBox}>{index}</div>
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

export default CourseView;
