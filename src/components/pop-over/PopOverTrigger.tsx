import type { ComponentProps, ReactNode } from 'react';

import clsx from 'clsx';

import { usePopOverContext } from './PopOver';
import * as S from './PopOver.css';

interface PropsType extends ComponentProps<'div'> {
    children: ReactNode;
}

const PopOverTrigger = ({ className, children }: PropsType) => {
    const { isPopOverOpen, openPopOver, closePopOver } = usePopOverContext();

    const togglePopOver = () => {
        isPopOverOpen ? closePopOver() : openPopOver();
    };

    return (
        <div onClick={togglePopOver} className={clsx(S.trigger, className)}>
            {children}
        </div>
    );
};

export default PopOverTrigger;
