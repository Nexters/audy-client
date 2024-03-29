import {
    type Dispatch,
    type SetStateAction,
    useContext,
    useState,
} from 'react';

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

import PathControlBox from './PathControlBox';
import * as S from './PathItem.css';
import ThreeDotButton from './ThreeDotButton';

interface PropsType {
    marker: MarkerType;
    order: number;
    setOrderedMarkerId: Dispatch<SetStateAction<string | null>>;
}

const PathItem = ({ marker, order, setOrderedMarkerId }: PropsType) => {
    const [isHover, setIsHover] = useState(false);

    const { selectedId } = useContext(PathViewContextValue);
    const { setSelectedId } = useContext(PathViewContextAction);

    const controls = useDragControls();
    const y = useMotionValue(0);

    const isSelected = selectedId === marker.pinId;

    const handleToggleHover = (updatedStatus: boolean) => {
        if (selectedId === null) setIsHover(updatedStatus);
    };

    const handleOutsideClick = () => {
        if (!isSelected) return;
        setSelectedId(null);
        setIsHover(false);
    };

    const { targetRef: containerRef } = useOnClickOutside({
        onClickOutside: handleOutsideClick,
    });

    const handlePointerDownListIcon = (
        event: React.PointerEvent<SVGSVGElement>,
    ) => {
        controls.start(event);
        setOrderedMarkerId(marker.pinId);
    };

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
            <ListIcon
                onPointerDown={handlePointerDownListIcon}
                className={S.listIcon}
            />

            <div className={S.orderBox}>{order}</div>

            <PathControlBox
                id={marker.pinId}
                name={marker.pinName}
                address={marker.address}
            />
            <ThreeDotButton pinId={marker.pinId} pinName={marker.pinName} />
        </Reorder.Item>
    );
};

export default PathItem;
