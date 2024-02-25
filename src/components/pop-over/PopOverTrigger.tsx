import type { PropsWithChildren } from 'react';

import { usePopOverContext } from './PopOver';

const PopOverTrigger = ({ children }: PropsWithChildren) => {
    const { isPopOverOpen, openPopOver, closePopOver } = usePopOverContext();

    const togglePopOver = () => {
        isPopOverOpen ? closePopOver() : openPopOver();
    };

    return <div onClick={togglePopOver}>{children}</div>;
};

export default PopOverTrigger;
