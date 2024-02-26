import { useContext } from 'react';

import { FeedbacksContext } from '@/utils/ui/FeedBacksProvider';

/**
 * Toast를 사용할 수 있는 Hook useToast
 * setToast에 토스트 메시지를 전달하여 토스트를 띄울 수 있음
 */

export const useToast = () => {
    const { setFeedbacks } = useContext(FeedbacksContext);

    const setToast = (message: string) => {
        if (!message) return;

        setFeedbacks((previous) => [
            ...previous,
            {
                type: 'toast',
                message,
            },
        ]);
    };

    return { setToast };
};
