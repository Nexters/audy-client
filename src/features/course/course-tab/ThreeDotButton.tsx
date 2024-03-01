import EditIcon from '@/assets/icons/edit.svg?react';
import ThreeDotIcon from '@/assets/icons/threeDot.svg?react';
import TrashCanIcon from '@/assets/icons/trashCan.svg?react';
import PopOver from '@/components/pop-over';
import { useModal } from '@/hooks/useModal';

import CourseNameEditModal from '../course-name-edit-modal';
import CourseRemoveModal from '../course-remove-modal/CourseRemoveModal';

import * as S from './ThreeDotButton.css';

interface PropsType {
    courseId: number;
    courseName: string;
}

const ThreeDotButton = ({ courseId, courseName }: PropsType) => {
    const { openModal } = useModal();

    const handleCourseEditIconClick = () => {
        openModal(
            <CourseNameEditModal courseId={courseId} courseName={courseName} />,
        );
    };

    const handleRemoveCourseIconClick = () => {
        openModal(<CourseRemoveModal courseId={courseId} />);
    };

    return (
        <PopOver>
            <PopOver.Trigger className={S.threeDotButton}>
                <ThreeDotIcon />
            </PopOver.Trigger>
            <PopOver.Content>
                <PopOver.Item onClick={handleCourseEditIconClick}>
                    <EditIcon />
                    <p className={S.text}>코스명 수정</p>
                </PopOver.Item>

                <PopOver.Item onClick={handleRemoveCourseIconClick}>
                    <TrashCanIcon />
                    <p className={S.text}>코스 삭제</p>
                </PopOver.Item>
            </PopOver.Content>
        </PopOver>
    );
};

export default ThreeDotButton;
