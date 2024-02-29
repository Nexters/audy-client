import Modal from '@/components/modal';
import { useModal } from '@/hooks/useModal';

import * as S from './EditorLimitModal.css';

const EditorLimitModal = () => {
    const { closeModal } = useModal();

    return (
        <Modal>
            <Modal.Title>더 이상 초대할 수 없어요</Modal.Title>
            <Modal.Content>
                <p className={S.infoText}>
                    5명의 친구가 이미 참여중이에요. 새로운 코스를 만들어보세요
                </p>
            </Modal.Content>
            <Modal.Footer>
                <button
                    className={S.footerButton}
                    onClick={closeModal}
                >
                    확인
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditorLimitModal;
