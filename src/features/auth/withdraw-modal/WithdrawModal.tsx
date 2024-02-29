import { useNavigate } from 'react-router-dom';

import Modal from '@/components/modal';
import { useModal } from '@/hooks/useModal';

import * as S from './WithdrawModal.css';

const WithdrawModal = () => {
    const navigate = useNavigate();
    const { closeModal } = useModal();

    const handleLogoutButtonClick = () => {
        navigate('/');
        closeModal();
    };

    return (
        <Modal>
            <Modal.Title>모든 정보가 지워져요</Modal.Title>
            <Modal.Content>
                <p className={S.infoText}>
                    탈퇴 후 삭제된 코스와 핀은 복구할 수 없어요
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
                    회원탈퇴
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default WithdrawModal;
