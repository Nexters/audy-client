import { useContext, useRef, useState } from 'react';

import {
    Reorder,
    animate,
    useDragControls,
    useMotionValue,
} from 'framer-motion';

import ListIcon from '@/assets/icons/list.svg?react';
import {
    PathViewContextAction,
    PathViewContextValue,
} from '@/features/path/path-view/PathViewContextProvider';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { MarkerType } from '@/types/map';

import PathCheckBox from './PathCheckBox';
import PathControlBox from './PathControlBox';
import * as S from './PathItem.css';

interface PropsType {
    marker: MarkerType;
    order: number;
}

const PathItem = ({ marker, order }: PropsType) => {
    const [isHover, setIsHover] = useState(false);

    const { selectedId } = useContext(PathViewContextValue);
    const { setSelectedId } = useContext(PathViewContextAction);

    const containerRef = useRef<HTMLDivElement | null>(null);

    const controls = useDragControls();
    const y = useMotionValue(0);

    const isSelected = selectedId === marker.id;

    const handleToggleHover = (updatedStatus: boolean) => {
        if (selectedId === null) setIsHover(updatedStatus);
    };

    const handleOutsideClick = () => {
        if (!isSelected) return;
        setSelectedId(null);
        setIsHover(false);
    };

    const handlePointerDownListIcon = (
        event: React.PointerEvent<SVGSVGElement>,
    ) => {
        controls.start(event);
    };

    useOnClickOutside({ ref: containerRef, handler: handleOutsideClick });

    return (
        <Reorder.Item
            value={marker}
            as="div"
            ref={containerRef}
            dragListener={false}
            dragControls={controls}
            onDragEnd={() => animate(y, 0)}
            onPointerOver={() => handleToggleHover(true)}
            onPointerOut={() => handleToggleHover(false)}
            style={{ y }}
            className={S.wrapper({
                status: isHover || isSelected ? 'selected' : 'none',
            })}
        >
            <PathCheckBox isHover={isHover} id={marker.id} order={order} />
            <PathControlBox
                id={marker.id}
                name={marker.name}
                address={marker.address}
            />
            <ListIcon
                onPointerDown={handlePointerDownListIcon}
                className={S.listIcon}
            />
        </Reorder.Item>
    );
};

export default PathItem;
