import { useEffect, useState } from 'react';

import EditIcon from '@/assets/icons/edit.svg?react';
import EyeClosedIcon from '@/assets/icons/eyeClosed.svg?react';
import EyeOpenedIcon from '@/assets/icons/eyeOpened.svg?react';
import ThreeDotIcon from '@/assets/icons/threeDot.svg?react';
import TrashCanIcon from '@/assets/icons/trashCan.svg?react';
import PopOver from '@/components/pop-over';
import { useDisclosure } from '@/hooks/useDisclosure';
import { useSnackBar } from '@/hooks/useSnackBar';
import { useTmap } from '@/hooks/useTmap';
import { MarkerType } from '@/types';

import * as S from './ThreeDotButton.css';

interface PropsType {
    markerId: string;
}

const ThreeDotButton = ({ markerId }: PropsType) => {
    const { tmapModuleRef } = useTmap();
    const { setSnackBar } = useSnackBar();

    const initPinHided =
        !!tmapModuleRef.current?.getMarkerInfoFromId(markerId)?.isHidden;

    const { value: isPinHided, toggle: togglePinHided } =
        useDisclosure(initPinHided);

    const handleHidePin = () => {
        if (!tmapModuleRef.current) return;
        tmapModuleRef.current.toggleMarkerHiddenState(markerId);
        togglePinHided();
    };

    const [removedPin, setRemovedPin] = useState({
        marker: {} as MarkerType,
        index: 0,
    });

    const handleRecreateRemovedPin = ({
        marker: { name, originName, address, lat, lng, id },
        index,
    }: {
        marker: MarkerType;
        index: number;
    }) => {
        tmapModuleRef.current?.createMarker({
            name: name,
            originName: originName,
            address: address,
            lat: lat,
            lng: lng,
            id: id,
            index,
        });
    };

    const handleRemovePin = () => {
        if (!tmapModuleRef.current) return;

        const { marker, index } = tmapModuleRef.current.removeMarker(markerId);
        setRemovedPin({ marker, index });

        // setSnackBar({
        //     message: '핀이 삭제되었어요',
        //     undoFunction: () => handleRecreateRemovedPin({ ...removedPin }),
        // });
    };

    useEffect(() => {
        console.log(removedPin);
        if (removedPin.marker.id) {
            setSnackBar({
                message: '핀이 삭제되었어요',
                undoFunction: () => handleRecreateRemovedPin({ ...removedPin }),
            });
        }
    }, [removedPin, setSnackBar, handleRecreateRemovedPin, setRemovedPin]);

    return (
        <PopOver>
            <PopOver.Trigger className={S.threeDotButton}>
                <ThreeDotIcon />
            </PopOver.Trigger>

            <PopOver.Content>
                {isPinHided ? (
                    <PopOver.Item onClick={handleHidePin}>
                        <EyeOpenedIcon />
                        <p className={S.text}>경로에서 보이기</p>
                    </PopOver.Item>
                ) : (
                    <PopOver.Item onClick={handleHidePin}>
                        <EyeClosedIcon />
                        <p className={S.text}>경로에서 숨기기</p>
                    </PopOver.Item>
                )}

                <PopOver.Item>
                    <EditIcon />
                    <p className={S.text}>장소명 수정</p>
                </PopOver.Item>

                <PopOver.Item onClick={handleRemovePin}>
                    <TrashCanIcon />
                    <p className={S.text}>장소 삭제</p>
                </PopOver.Item>
            </PopOver.Content>
        </PopOver>
    );
};

export default ThreeDotButton;
