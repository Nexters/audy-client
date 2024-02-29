import type { ComponentProps, MouseEvent, ReactNode } from 'react';

import clsx from 'clsx';

import { usePopOverContext } from './PopOver';
import * as S from './PopOver.css';

interface PropsType extends ComponentProps<'div'> {
    children: ReactNode;
}

const TooltipTrigger = ({
    className,
    children,
    onClick,
    ...restProps
}: PropsType) => {
    const { isPopOverOpen, openPopOver, closePopOver } = usePopOverContext();

    const toggleTooltip = () => {
        isPopOverOpen ? closePopOver() : openPopOver();
    };

    const handlePopOverTrigger = (event: MouseEvent<HTMLDivElement>) => {
        onClick?.(event);
        toggleTooltip();
    };

    return (
        <div
            onClick={handlePopOverTrigger}
            className={clsx(S.trigger, className)}
            {...restProps}
        >
            {children}
        </div>
    );
};

export default TooltipTrigger;
