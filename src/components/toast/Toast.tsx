import { useToast } from '@/hooks/useToast';

import AppPortal from '../app-portal';

import * as S from './Toast.css';

const Toast = () => {
    const { toastMessage, setToast } = useToast();

    if (!toastMessage) return null;

    return (
        <AppPortal.Wrapper>
            <div className={S.layout} onAnimationEnd={() => setToast('')}>
                {toastMessage}
            </div>
        </AppPortal.Wrapper>
    );
};

export default Toast;
