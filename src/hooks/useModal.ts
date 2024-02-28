import { useMemo } from 'react';

import { useSetAtom } from 'jotai';

import { removeModalAtom, useModalAtom } from '@/store/modal/action';

export const useModal = () => {
    const openModal = useSetAtom(useModalAtom);
    const closeModal = useSetAtom(removeModalAtom);

    return useMemo(
        () => ({
            closeModal,
            openModal,
        }),
        [closeModal, openModal],
    );
};
