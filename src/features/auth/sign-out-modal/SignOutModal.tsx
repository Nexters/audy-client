import { useNavigate } from 'react-router-dom';

import Modal from '@/components/modal';
import { useModal } from '@/hooks/useModal';

import * as S from './SignOutModal.css';

const SignOutModal = () => {
    const navigate = useNavigate();
    const { closeModal } = useModal();

    const handleLogoutButtonClick = () => {
        navigate('/');
        closeModal();
    };

    return (
        <Modal>
            <Modal.Title>지금 나가기</Modal.Title>
            <Modal.Content>
                <p className={S.infoText}>
                    다시 로그인 하려면 가입하신 소셜 계정으로 접속해주세요
                </p>
            </Modal.Content>
            <Modal.Footer>
                <button
                    className={S.footerButton({ action: 'cancel' })}
                    onClick={closeModal}
                >
                    취소
                </button>
                <button
                    className={S.footerButton({ action: 'logout' })}
                    onClick={handleLogoutButtonClick}
                >
                    로그아웃
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default SignOutModal;
