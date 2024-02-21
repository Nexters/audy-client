import { PropsWithChildren, useState } from 'react';
import { createContext } from 'react';

interface SnackBarProviderType {
    snackBarMessage: string;
    setSnackBarMessage: (message: string) => void;
    snackBarUndoFunction: () => void;
    setSnackBarUndoFunction: (undoFunction: () => void) => void;
}

export const SnackBarContext = createContext<SnackBarProviderType>(
    {} as SnackBarProviderType,
);

interface PropsType extends PropsWithChildren {}

export const SnackBarProvider = ({ children }: PropsType) => {
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const [snackBarUndoFunction, setSnackBarUndoFunction] = useState<
        () => void
    >(() => () => {});

    return (
        <SnackBarContext.Provider
            value={{
                snackBarMessage,
                setSnackBarMessage,
                snackBarUndoFunction,
                setSnackBarUndoFunction,
            }}
        >
            {children}
        </SnackBarContext.Provider>
    );
};
