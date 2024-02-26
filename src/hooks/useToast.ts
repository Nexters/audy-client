import { useContext } from 'react';

import { ToastContext } from '@/utils/ui/ToastProvider';

/**
 * Toast를 사용할 수 있는 Hook useToast
 * setToast에 토스트 메시지를 전달하여 토스트를 띄울 수 있음
 */

export const useToast = () => {
    const { toastMessage, setToastMessage } = useContext(ToastContext);

    const setToast = (message: string) => setToastMessage(message);

    return { toastMessage, setToast };
};
