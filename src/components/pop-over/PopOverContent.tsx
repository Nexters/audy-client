import { type PropsWithChildren, useRef } from 'react';

import { useOnClickOutside } from '@/hooks/useOnClickOutside';

import { usePopOverContext } from './PopOver';
import * as S from './PopOver.css';

const PopOverContent = ({ children }: PropsWithChildren) => {
    const { closePopOver } = usePopOverContext();

    const contentRef = useRef<HTMLDivElement>(null);

    useOnClickOutside({
        ref: contentRef,
        handler: ({ target }) => {
            if (
                target instanceof Node &&
                contentRef.current?.contains(target)
            ) {
                return;
            }
            closePopOver();
        },
    });

    return (
        <div className={S.content} ref={contentRef}>
            {children}
        </div>
    );
};

export default PopOverContent;
