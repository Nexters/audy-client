import { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import CloseIcon from '@/assets/icons/close.svg?react';

import * as S from './SnackBar.css';

interface PropsType {
    message: string;
    undoFunction?: () => void;
}

const SnackBar = ({ message, undoFunction = () => {} }: PropsType) => {
    if (!message) return null;

    const [isVisible, setIsVisible] = useState(true);

    const handleSnackBarUndoFunction = () => {
        undoFunction();
        setIsVisible(false);
    };

    const handleSnackBarClose = () => {
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className={S.layout}
                    initial={{ opacity: 1 }}
                    animate={{
                        opacity: 0,
                        transitionEnd: { display: 'none' },
                        transition: { duration: 0.5, delay: 8 },
                    }}
                    exit={{ opacity: 0 }}
                >
                    {message}
                    <div>
                        <button
                            className={S.undoButton}
                            onClick={handleSnackBarUndoFunction}
                        >
                            실행취소
                        </button>
                        <button onClick={handleSnackBarClose}>x</button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SnackBar;
