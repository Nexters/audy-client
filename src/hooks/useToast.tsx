import { useContext } from 'react';

import { ToastContext } from '@/utils/toast/ToastProvider';

export const useToast = () => {
    const { toastMessage, setToastMessage } = useContext(ToastContext);

    const setToast = (message: string) => setToastMessage(message);

    return { toastMessage, setToast };
};
