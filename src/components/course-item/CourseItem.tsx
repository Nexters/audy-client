import { useContext } from 'react';

import {
    Reorder,
    animate,
    useDragControls,
    useMotionValue,
} from 'framer-motion';

import ListIcon from '@/assets/icons/list.svg?react';
import { CourseViewContextValue } from '@/components/course-view/CourseViewContextProvider';
import { useDisclosure } from '@/hooks/useDisclosure';

import CourseCheckBox from './CourseCheckBox';
import CourseControlBox from './CourseControlBox';
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
    const { value: isHover, toggle: toggleIsHover } = useDisclosure(false);

    const { selectedId } = useContext(CourseViewContextValue);

    const controls = useDragControls();
    const y = useMotionValue(0);

    const onPointerDown = (event: React.PointerEvent<SVGSVGElement>) => {
        controls.start(event);
    };

    const isChecked = selectedId === course.id;

    return (
        <Reorder.Item
            value={course}
            dragListener={false}
            dragControls={controls}
            onDragEnd={() => animate(y, 0)}
            onPointerOver={toggleIsHover}
            onPointerOut={toggleIsHover}
            style={{ y }}
            className={styles.wrapper({
                status: isHover || isChecked ? 'selected' : 'none',
            })}
        >
            <CourseCheckBox isHover={isHover} id={course.id} order={order} />
            <CourseControlBox
                isHover={isHover}
                id={course.id}
                name={course.name}
                address={course.address}
            />
            <ListIcon
                onPointerDown={onPointerDown}
                className={styles.listIcon}
            />
        </Reorder.Item>
    );
};

export default CourseItem;
