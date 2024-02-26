import { ComponentProps, useEffect } from 'react';

import clsx from 'clsx';

import AppPortal from '@/components/app-portal';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

import { useDialogContext } from './Dialog';
import * as S from './Dialog.css';

interface PropsType extends ComponentProps<'div'> {}

const DialogContent = ({ children, className, ...restProps }: PropsType) => {
    const { isDialogOpen, closeDialog } = useDialogContext();

    const { targetRef: contentRef } = useOnClickOutside({
        onClickOutside: closeDialog,
    });

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <>
            {isDialogOpen && (
                <AppPortal.Wrapper>
                    <div className={S.overlay}>
                        <div
                            className={clsx(S.content, className)}
                            ref={contentRef}
                            {...restProps}
                        >
                            {children}
                        </div>
                    </div>
                </AppPortal.Wrapper>
            )}
        </>
    );
};

export default DialogContent;
