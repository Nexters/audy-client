import { useContext } from 'react';

import { SnackBarContext } from '@/utils/ui/SnackBarProvider';

/**
 * SnackBar를 사용할 수 있는 Hook useSnackBar
 * setSnackBar에 스낵바 메시지와 undo 함수를 전달하여 스낵바를 띄울 수 있음
 */

export const useSnackBar = () => {
    const {
        snackBarMessage,
        setSnackBarMessage,
        snackBarUndoFunction,
        setSnackBarUndoFunction,
    } = useContext(SnackBarContext);

    const setSnackBar = ({
        message,
        undoFunction,
    }: {
        message: string;
        undoFunction: () => void;
    }) => {
        setSnackBarMessage(message);
        setSnackBarUndoFunction(() => undoFunction);
    };

    return { snackBarMessage, snackBarUndoFunction, setSnackBar };
};
