import { useContext } from 'react';

import { FeedbacksContext } from '@/utils/ui/FeedBacksProvider';

/**
 * SnackBar를 사용할 수 있는 Hook useSnackBar
 * setSnackBar에 스낵바 메시지와 undo 함수를 전달하여 스낵바를 띄울 수 있음
 */

export const useSnackBar = () => {
    const { setFeedbacks } = useContext(FeedbacksContext);

    const setSnackBar = ({
        message,
        undoFunction,
    }: {
        message: string;
        undoFunction?: () => void;
    }): void => {
        if (!message) return;

        setFeedbacks((previous) => [
            ...previous,
            {
                type: 'snackBar',
                message,
                undoFunction,
            },
        ]);
    };

    return { setSnackBar };
};
