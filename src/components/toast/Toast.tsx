import { useToast } from '@/hooks/useToast';

import * as S from './Toast.css';

const Toast = () => {
    const { toastMessage, setToast } = useToast();

    if (!toastMessage) return null;

    return (
        <div className={S.layout} onAnimationEnd={() => setToast('')}>
            {toastMessage}
        </div>
    );
};

export default Toast;
