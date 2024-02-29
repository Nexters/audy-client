import { CourseRepository } from '@/apis/course';
import Modal from '@/components/modal';
import { useModal } from '@/hooks/useModal';
import { useToast } from '@/hooks/useToast';

import * as S from './EditorInviteModal.css';

interface PropsType {
    courseId: number;
}

const EditorInviteModal = ({ courseId }: PropsType) => {
    const { closeModal } = useModal();
    const { setToast } = useToast();

    const handleInviteButtonClick = async () => {
        try {
            const { url } = await CourseRepository.postInviteCourseAsync({
                courseId,
            });
            window.navigator.clipboard.writeText(url);
            setToast('초대 링크 복사가 완료되었어요!');
        } catch (error) {
            setToast('유저 초대에 실패했습니다.');
        }
        closeModal();
    };

    return (
        <Modal>
            <Modal.Title>같이 다녀올 친구 초대</Modal.Title>
            <Modal.Content>
                <p className={S.infoText}>
                    최대 5명까지 친구를 초대할 수 있어요
                </p>
            </Modal.Content>
            <Modal.Footer>
                <button
                    className={S.footerButton}
                    onClick={handleInviteButtonClick}
                >
                    초대 링크 복사
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditorInviteModal;
