import { useEffect } from 'react';

import { useAtomValue } from 'jotai';

import AppPortal from '@/components/app-portal';
import * as S from '@/components/modal/Modal.css';
import { useModalAtom } from '@/store/modal/action';

export const ModalProvider = () => {
    const { isModalOpen, modal } = useAtomValue(useModalAtom);

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
                    <div className={S.overlay}>{modal}</div>
                </AppPortal.Wrapper>
            )}
        </>
    );
};
