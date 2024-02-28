import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import CloseIcon from '@/assets/icons/close.svg?react';
import Modal from '@/components/modal/Modal';
import { useModal } from '@/hooks/useModal';
import { useToast } from '@/hooks/useToast';
import { usePostSaveCourse } from '@/query-hooks/course/mutation';

import * as S from './MakeNewCourseModal.css';

const MakeNewCourseModal = () => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [courseName, setCourseName] = useState('새로운 코스');

    const { closeModal } = useModal();
    const { setToast } = useToast();
    const { mutateAsync: makeNewCourse } = usePostSaveCourse({});

    const navigate = useNavigate();

    const handleSaveButtonClick = async () => {
        const { data } = await makeNewCourse(courseName);

        closeModal();
        setToast('새 코스가 만들어졌어요');
        navigate(`/course/${data.courseId}`);
    };

    const handleNewCourseNameChange = ({
        target,
    }: React.ChangeEvent<HTMLInputElement>) => {
        if (!target.value) setIsButtonDisabled(true);
        else setIsButtonDisabled(false);

        setCourseName(target.value);
    };

    return (
        <Modal>
            <div className={S.modalHeader}>
                <Modal.Title>새 코스 추가</Modal.Title>
                <button className={S.modalCloseButton} onClick={closeModal}>
                    <CloseIcon width={28} height={28} />
                </button>
            </div>

            <Modal.Content>
                <input
                    className={S.couseNameInput}
                    value={courseName}
                    onChange={handleNewCourseNameChange}
                />
            </Modal.Content>

            <Modal.Footer>
                <button
                    className={S.saveButton({ isButtonDisabled })}
                    onClick={handleSaveButtonClick}
                    disabled={isButtonDisabled}
                >
                    저장
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default MakeNewCourseModal;
