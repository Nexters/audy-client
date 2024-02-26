import type { ComponentProps } from 'react';

import clsx from 'clsx';

import { usePopOverContext } from './PopOver';
import * as S from './PopOver.css';

const PopOverContent = ({
    children,
    className,
    ...restProps
}: ComponentProps<'div'>) => {
    const { isPopOverOpen } = usePopOverContext();

    return (
        <>
            {isPopOverOpen && (
                <div className={clsx(S.content, className)} {...restProps}>
                    {children}
                </div>
            )}
        </>
    );
};

export default PopOverContent;
