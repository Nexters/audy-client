import Modal from '@/components/modal/Modal';
import { useModal } from '@/hooks/useModal';
import { useToast } from '@/hooks/useToast';
import { useDeleteCourse } from '@/query-hooks/course/mutation';

import * as S from './CourseRemoveModal.css';

interface PropsType {
    courseId: number;
    userId: number;
}

const CourseRemoveModal = ({ courseId, userId }: PropsType) => {
    const { closeModal } = useModal();
    const { setToast } = useToast();
    const { mutate: deleteCourse } = useDeleteCourse({
        courseId,
        userId: userId,
    });

    const handleRemoveButtonClick = () => {
        deleteCourse();
        closeModal();
        setToast('코스가 삭제되었어요');
    };

    return (
        <Modal>
            <Modal.Title>이 코스를 삭제할까요?</Modal.Title>
            <Modal.Content>
                <p className={S.informationText}>
                    코스에 저장된 핀은 복구할 수 없어요
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
                    className={S.footerButton({ action: 'remove' })}
                    onClick={handleRemoveButtonClick}
                >
                    삭제
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default CourseRemoveModal;
