import { useState } from 'react';

import EditIcon from '@/assets/icons/edit.svg?react';
import EyeClosedIcon from '@/assets/icons/eyeClosed.svg?react';
import EyeOpenedIcon from '@/assets/icons/eyeOpened.svg?react';
import TrashCanIcon from '@/assets/icons/trashCan.svg?react';
import { useTmap } from '@/hooks/useTmap';

import * as S from './PathPopover.css';

interface PropsType {
    markerId: string;
}

const PathPopover = ({ markerId }: PropsType) => {
    const { tmapModuleRef } = useTmap();

    const [isPinHided, setIsPinHided] = useState(
        tmapModuleRef.current?.getMarkerInfoFromId(markerId).isHidden,
    );

    const handlePinHide = () => {
        if (!tmapModuleRef.current) return;

        tmapModuleRef.current.toggleMarkerHiddenState(markerId);
        setIsPinHided((prev) => !prev);
    };

    return (
        <div className={S.layout}>
            {isPinHided ? (
                <button
                    className={S.popoverTextContainer}
                    onClick={handlePinHide}
                >
                    <EyeOpenedIcon />
                    <p className={S.popoverText}>경로에서 보이기</p>
                </button>
            ) : (
                <button
                    className={S.popoverTextContainer}
                    onClick={handlePinHide}
                >
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
