import { type PropsWithChildren } from 'react';

import { usePopOverContext } from './PopOver';
import * as S from './PopOver.css';

const PopOverContent = ({ children }: PropsWithChildren) => {
    const { isPopOverOpen } = usePopOverContext();

    return (
        <>
            {isPopOverOpen && (
                <div className={S.content}>
                    {children}
                </div>
            )}
        </>
    );
};

export default PopOverContent;
