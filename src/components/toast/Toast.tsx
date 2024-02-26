import { motion } from 'framer-motion';

import * as S from './Toast.css';

interface PropsType {
    message: string;
}

const Toast = ({ message }: PropsType) => {
    if (!message) return null;

    return (
        <motion.div
            className={S.layout}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0, transitionEnd: { display: 'none' } }}
            transition={{ duration: 0.5, delay: 4 }}
        >
            {message}
        </motion.div>
    );
};

export default Toast;
