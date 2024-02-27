import { useEffect } from 'react';

import { useAtomValue, useSetAtom } from 'jotai';

import AppPortal from '@/components/app-portal';
import * as S from '@/components/modal/Modal.css';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { removeModalAtom, useModalAtom } from '@/store/modal/action';

export const ModalProvider = () => {
    const { isModalOpen, modal } = useAtomValue(useModalAtom);
    const closeModal = useSetAtom(removeModalAtom);

    const { targetRef: contentRef } = useOnClickOutside({
        onClickOutside: closeModal,
    });

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <>
            {isModalOpen && (
                <AppPortal.Wrapper>
                    <div className={S.overlay} ref={contentRef}>
                        {modal}
                    </div>
                </AppPortal.Wrapper>
            )}
        </>
    );
};
