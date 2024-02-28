import type { ReactNode } from 'react';

import { atom } from 'jotai';

import { modalAtom } from './store';

export const useModalAtom = atom(
    (get) => get(modalAtom),
    (_, set, modal: ReactNode) => {
        set(modalAtom, {
            modal,
            isModalOpen: true,
        });
    },
);

export const removeModalAtom = atom(
    (get) => get(modalAtom).modal,
    (_, set) => {
        set(modalAtom, {
            modal: null,
            isModalOpen: false,
        });
    },
);
