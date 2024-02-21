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

    return (
        <div className={S.layout} onAnimationEnd={handleOnAnimationEnd}>
            {snackBarMessage}
            <button onClick={handleSnackBarUndoFunction}>undo</button>
        </div>
    );
};

export default SnackBar;
