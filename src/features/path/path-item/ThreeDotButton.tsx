import { useRef, useState } from 'react';

import ThreeDotIcon from '@/assets/icons/threeDot.svg?react';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

import PathPopover from '../path-popover';

import * as S from './ThreeDotButton.css';

interface PropsType {
    markerId: string;
}

const ThreeDotButton = ({ markerId }: PropsType) => {
    const [isClicked, setIsClicked] = useState(false);

    const pathPopoverRef = useRef<HTMLDivElement | null>(null);
    const threeDotRef = useRef<HTMLButtonElement | null>(null);

    const handleThreeDotClick = () => setIsClicked((prev) => !prev);

    useOnClickOutside({
        ref: pathPopoverRef,
        handler: ({ target }) => {
            if (
                threeDotRef.current &&
                target instanceof Node &&
                threeDotRef.current.contains(target)
            ) {
                return;
            }

            setIsClicked(false);
        },
    });

    return (
        <div>
            <button
                className={S.threeDotButton}
                onClick={handleThreeDotClick}
                ref={threeDotRef}
            >
                <ThreeDotIcon />
            </button>

            <div className={S.pathPopover({ isClicked })} ref={pathPopoverRef}>
                <PathPopover markerId={markerId} />
            </div>
        </div>
    );
};

export default ThreeDotButton;
