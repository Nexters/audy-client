import { useContext, useRef, useState } from 'react';

import {
    Reorder,
    animate,
    useDragControls,
    useMotionValue,
} from 'framer-motion';

import ListIcon from '@/assets/icons/list.svg?react';
import {
    CourseViewContextAction,
    CourseViewContextValue,
} from '@/features/course/course-view/CourseViewContextProvider';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { MarkersType } from '@/types/map';

import CourseCheckBox from './CourseCheckBox';
import CourseControlBox from './CourseControlBox';
import * as styles from './CourseItem.css';

interface PropsType {
    course: MarkersType;
    order: number;
}

const CourseItem = ({ course, order }: PropsType) => {
    const [isHover, setIsHover] = useState(false);

    const { selectedId } = useContext(CourseViewContextValue);
    const { setSelectedId } = useContext(CourseViewContextAction);

    const containerRef = useRef<HTMLDivElement | null>(null);

    const controls = useDragControls();
    const y = useMotionValue(0);

    const isSelected = selectedId === course.id;

    const handleToggleHover = (updatedStatus: boolean) => {
        if (selectedId === null) setIsHover(updatedStatus);
    };

    const handleClickOutside = () => {
        if (!isSelected) return;
        setSelectedId(null);
        setIsHover(false);
    };

    const handlePointerDownListIcon = (
        event: React.PointerEvent<SVGSVGElement>,
    ) => {
        controls.start(event);
    };

    useOnClickOutside({ ref: containerRef, handler: handleClickOutside });

    return (
        <Reorder.Item
            value={course}
            as="div"
            ref={containerRef}
            dragListener={false}
            dragControls={controls}
            onDragEnd={() => animate(y, 0)}
            onPointerOver={() => handleToggleHover(true)}
            onPointerOut={() => handleToggleHover(false)}
            style={{ y }}
            className={styles.wrapper({
                status: isHover || isSelected ? 'selected' : 'none',
            })}
        >
            <CourseCheckBox isHover={isHover} id={course.id} order={order} />
            <CourseControlBox
                id={course.id}
                name={course.name}
                address={course.address}
            />
            <ListIcon
                onPointerDown={handlePointerDownListIcon}
                className={styles.listIcon}
            />
        </Reorder.Item>
    );
};

export default CourseItem;
