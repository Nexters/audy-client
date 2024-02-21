import { PropsWithChildren, useState } from 'react';
import { createContext } from 'react';

interface ToastProviderType {
    toastMessage: string;
    setToastMessage: (message: string) => void;
}

export const ToastContext = createContext<ToastProviderType>(
    {} as ToastProviderType,
);

interface PropsType extends PropsWithChildren {}

export const ToastProvider = ({ children }: PropsType) => {
    const [toastMessage, setToastMessage] = useState<string>('');

    return (
        <ToastContext.Provider value={{ toastMessage, setToastMessage }}>
            {children}
        </ToastContext.Provider>
    );
};
