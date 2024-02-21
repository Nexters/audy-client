import { PropsWithChildren, useState } from 'react';
import { createContext } from 'react';

interface ToastProviderType {
    toastMessage: string;
    setToastMessage: (message: string) => void;
}

export const ToastContext = createContext<ToastProviderType>(
    {} as ToastProviderType,
);

export const ToastProvider = ({ children }: PropsWithChildren) => {
    const [toastMessage, setToastMessage] = useState<string>('');

    return (
        <ToastContext.Provider value={{ toastMessage, setToastMessage }}>
            {children}
        </ToastContext.Provider>
    );
};
