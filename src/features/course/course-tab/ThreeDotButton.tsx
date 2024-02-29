import EditIcon from '@/assets/icons/edit.svg?react';
import ThreeDotIcon from '@/assets/icons/threeDot.svg?react';
import TrashCanIcon from '@/assets/icons/trashCan.svg?react';
import PopOver from '@/components/pop-over';

import * as S from './ThreeDotButton.css';

interface PropsType {
    courseId: number;
}

const ThreeDotButton = ({ courseId }: PropsType) => {
    // TODO : 모달 컴포넌트 개발 이후 수정 모달 추가 필요
    const handleCourseEditIconClick = () => {
        console.log(courseId);
    };

    const handleRemoveCourseIconClick = () => {
        console.log(courseId);
    };

    return (
        <PopOver>
            <PopOver.Trigger className={S.threeDotButton}>
                <ThreeDotIcon />
            </PopOver.Trigger>
            <PopOver.Content>
                <PopOver.Item onClick={handleCourseEditIconClick}>
                    <EditIcon />
                    <p className={S.text}>장소명 수정</p>
                </PopOver.Item>

                <PopOver.Item onClick={handleRemoveCourseIconClick}>
                    <TrashCanIcon />
                    <p className={S.text}>장소 삭제</p>
                </PopOver.Item>
            </PopOver.Content>
        </PopOver>
    );
};

export default ThreeDotButton;
