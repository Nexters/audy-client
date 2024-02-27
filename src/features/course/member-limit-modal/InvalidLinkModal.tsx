import Modal from '@/components/modal';
import { useModal } from '@/hooks/useModal';

import * as S from './InvalidLinkModal.css';
import { useNavigate } from 'react-router-dom';

const InvalidLinkModal = () => {
    const { closeModal } = useModal();
    const navigate = useNavigate();

    const handleConfirmButtonClick = () => {
        navigate('/');
        closeModal();
    }

    return (
        <Modal>
            <Modal.Title>유효하지 않은 링크입니다</Modal.Title>
            <Modal.Content>
                <p className={S.infoText}>
                    더이상 새로운 게스트가 참여할 수 없어요. 
                </p>
            </Modal.Content>
            <Modal.Footer>
                <button
                    className={S.footerButton}
                    onClick={handleConfirmButtonClick}
                >
                    확인
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default InvalidLinkModal;
