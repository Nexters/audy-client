import { ReactNode } from 'react';

import { atom } from 'jotai';

interface ModalAtomType {
    isModalOpen: boolean;
    modal: ReactNode | null;
}

export const modalAtom = atom<ModalAtomType>({
    isModalOpen: false,
    modal: null,
});
