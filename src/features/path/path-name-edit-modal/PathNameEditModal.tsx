import { useState } from 'react';

import CloseIcon from '@/assets/icons/close.svg?react';
import Modal from '@/components/modal/Modal';
import { useModal } from '@/hooks/useModal';
import { useToast } from '@/hooks/useToast';
import type { MarkerType } from '@/types';

import * as S from './PathNameEditModal.css';

interface PropsType {
    pinId: string;
    pinName: string;
    modifyPinName: (props: Pick<MarkerType, 'pinId' | 'pinName'>) => void;
}

const PathNameEditModal = ({ pinId, pinName, modifyPinName }: PropsType) => {
    const { closeModal } = useModal();
    const { setToast } = useToast();

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [newPathName, setNewPathName] = useState(pinName);

    const handleEditButtonClick = () => {
        modifyPinName({ pinId, pinName: newPathName });
        closeModal();
        setToast('코스 이름이 변경되었어요');
    };

    const handleNewPathNameChange = ({
        target,
    }: React.ChangeEvent<HTMLInputElement>) => {
        if (!target.value) setIsButtonDisabled(true);
        else setIsButtonDisabled(false);

        setNewPathName(target.value);
    };

    return (
        <Modal>
            <div className={S.modalHeader}>
                <Modal.Title>코스명 수정</Modal.Title>
                <button className={S.modalCloseButton} onClick={closeModal}>
                    <CloseIcon width={28} height={28} />
                </button>
            </div>

            <Modal.Content>
                <input
                    className={S.couseNameInput}
                    value={newPathName}
                    onChange={handleNewPathNameChange}
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

export default PathNameEditModal;
