import { useState } from 'react';

import Modal from '@/components/modal/Modal';
import { useModal } from '@/hooks/useModal';
import { useToast } from '@/hooks/useToast';
import { usePatchCourseName } from '@/query-hooks/course/mutation';

import * as S from './CourseNameEditModal.css';

interface PropsType {
    courseId: number;
    courseName: string;
}

const CourseNameEditModal = ({ courseId, courseName }: PropsType) => {
    const { closeModal } = useModal();
    const { setToast } = useToast();

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [newCourseName, setNewCourseName] = useState(courseName);

    const { mutate: updateCourseName } = usePatchCourseName({ courseId });

    const handleEditButtonClick = () => {
        updateCourseName(newCourseName);
        closeModal();
        setToast('코스 이름이 변경되었어요');
    };

    const handleNewCourseNameChange = ({
        target,
    }: React.ChangeEvent<HTMLInputElement>) => {
        if (!target.value) setIsButtonDisabled(true);
        else setIsButtonDisabled(false);

        setNewCourseName(target.value);
    };

    return (
        <Modal>
            <Modal.Title>코스명 수정</Modal.Title>
            <Modal.Content>
                <input
                    className={S.couseNameInput}
                    value={newCourseName}
                    onChange={handleNewCourseNameChange}
                />
            </Modal.Content>
            <Modal.Footer>
                <button
                    className={S.editButton({ isButtonDisabled })}
                    onClick={handleEditButtonClick}
                    disabled={isButtonDisabled}
                >
                    수정
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default CourseNameEditModal;
