import type { ComponentProps, MouseEvent } from 'react';

import clsx from 'clsx';

import { usePopOverContext } from './PopOver';
import * as S from './PopOver.css';

const PopOverItem = ({
    children,
    className,
    onClick,
    ...restProps
}: ComponentProps<'button'>) => {
    const { closePopOver } = usePopOverContext();

    const handlePopOverItem = (event: MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        closePopOver();
    };

    return (
        <button
            className={clsx(S.item, className)}
            onClick={handlePopOverItem}
            {...restProps}
        >
            {children}
        </button>
    );
};

export default PopOverItem;
