import {
    type PropsWithChildren,
    createContext,
    useContext,
    useMemo,
} from 'react';

import { useDisclosure } from '@/hooks/useDisclosure';

import DialogTitle from './DialogTitle';
import DialogTrigger from './DialogTrigger';
import DialogContent from './DialogContent';
import DialogClose from './DialogClose';

interface DialogContextType {
    isDialogOpen: boolean;
    openDialog: () => void;
    closeDialog: () => void;
}

const DialogContext = createContext<DialogContextType | null>(null);

const DialogRoot = ({ children }: PropsWithChildren) => {
    const {
        value: isDialogOpen,
        open: openDialog,
        close: closeDialog,
    } = useDisclosure(false);

    const value = useMemo(
        () => ({
            isDialogOpen,
            openDialog,
            closeDialog,
        }),
        [closeDialog, openDialog, isDialogOpen],
    );

    return (
        <DialogContext.Provider value={value}>
            {children}
        </DialogContext.Provider>
    );
};

export const useDialogContext = () => {
    const context = useContext(DialogContext);

    if (!context) {
        throw new Error('useDialogContext must be used within DialogContext');
    }

    return context;
};

const Dialog = Object.assign(DialogRoot, {
    Trigger: DialogTrigger,
    Title: DialogTitle,
    Content: DialogContent,
    Close: DialogClose,
});

export default Dialog;
