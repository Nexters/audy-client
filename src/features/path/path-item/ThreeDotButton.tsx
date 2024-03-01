import EditIcon from '@/assets/icons/edit.svg?react';
import EyeClosedIcon from '@/assets/icons/eyeClosed.svg?react';
import EyeOpenedIcon from '@/assets/icons/eyeOpened.svg?react';
import ThreeDotIcon from '@/assets/icons/threeDot.svg?react';
import TrashCanIcon from '@/assets/icons/trashCan.svg?react';
import PopOver from '@/components/pop-over';
import { useDisclosure } from '@/hooks/useDisclosure';
import { useTmap } from '@/hooks/useTmap';

import * as S from './ThreeDotButton.css';

interface PropsType {
    markerId: string;
}

const ThreeDotButton = ({ markerId }: PropsType) => {
    const { tmapModule } = useTmap();

    const initPinHided =
        !!tmapModule?.getMarkerById(markerId)?.isHidden;

    const { value: isPinHided, toggle: togglePinHided } =
        useDisclosure(initPinHided);

    const handlePinHide = () => {
        if (!tmapModule) return;
        tmapModule.toggleMarkerHiddenState(markerId);
        togglePinHided();
    };

    const handlePinRemove = () => {
        tmapModule?.removeMarker(markerId);
    }

    return (
        <PopOver>
            <PopOver.Trigger className={S.threeDotButton}>
                <ThreeDotIcon />
            </PopOver.Trigger>
            <PopOver.Content>
                {isPinHided ? (
                    <PopOver.Item onClick={handlePinHide}>
                        <EyeOpenedIcon />
                        <p className={S.text}>경로에서 보이기</p>
                    </PopOver.Item>
                ) : (
                    <PopOver.Item onClick={handlePinHide}>
                        <EyeClosedIcon />
                        <p className={S.text}>경로에서 숨기기</p>
                    </PopOver.Item>
                )}

                <PopOver.Item>
                    <EditIcon />
                    <p className={S.text}>장소명 수정</p>
                </PopOver.Item>

                <PopOver.Item onClick={handlePinRemove}>
                    <TrashCanIcon />
                    <p className={S.text}>장소 삭제</p>
                </PopOver.Item>
            </PopOver.Content>
        </PopOver>
    );
};

export default ThreeDotButton;
