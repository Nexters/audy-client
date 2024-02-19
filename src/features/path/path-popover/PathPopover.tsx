import EditIcon from '@/assets/icons/edit.svg?react';
import EyeClosedIcon from '@/assets/icons/eyeClosed.svg?react';
import EyeOpenedIcon from '@/assets/icons/eyeOpened.svg?react';
import TrashCanIcon from '@/assets/icons/trashCan.svg?react';

import * as S from './PathPopover.css';

interface PropsType {
    isPinHided: boolean;
}

const PathPopover = ({ isPinHided }: PropsType) => {
    return (
        <div className={S.layout}>
            {isPinHided ? (
                <button className={S.popoverTextContainer}>
                    <EyeOpenedIcon />
                    <p className={S.popoverText}>경로에서 보이기</p>
                </button>
            ) : (
                <button className={S.popoverTextContainer}>
                    <EyeClosedIcon />
                    <p className={S.popoverText}>경로에서 숨기기</p>
                </button>
            )}

            <button className={S.popoverTextContainer}>
                <EditIcon />
                <p className={S.popoverText}>장소명 수정</p>
            </button>

            <button className={S.popoverTextContainer}>
                <TrashCanIcon />
                <p className={S.popoverText}>장소 삭제</p>
            </button>
        </div>
    );
};

export default PathPopover;
