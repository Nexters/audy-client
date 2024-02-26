import { useSnackBar } from '@/hooks/useSnackBar';

import * as S from './SnackBar.css';

const SnackBar = () => {
    const { snackBarMessage, snackBarUndoFunction, setSnackBar } =
        useSnackBar();

    if (!snackBarMessage) return null;

    const handleOnAnimationEnd = () => {
        setSnackBar({
            message: '',
            undoFunction: () => {},
        });
    };

    const handleSnackBarUndoFunction = () => {
        snackBarUndoFunction();
        setSnackBar({
            message: '',
            undoFunction: () => {},
        });
    };

    const handleSnackBarClose = () => {
        setSnackBar({
            message: '',
            undoFunction: () => {},
        });
    };

    return (
        <div className={S.layout} onAnimationEnd={handleOnAnimationEnd}>
            {snackBarMessage}

            <div>
                <button
                    onClick={handleSnackBarUndoFunction}
                    className={S.undoButton}
                >
                    실행취소
                </button>
                <button onClick={handleSnackBarClose}>x</button>
            </div>
        </div>
    );
};

export default SnackBar;
