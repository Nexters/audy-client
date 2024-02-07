import { useContext, useRef, useState } from 'react';

import LocationIcon from '@/assets/icons/location.svg?react';
import ModifyIcon from '@/assets/icons/modify.svg?react';
import TrashCanIcon from '@/assets/icons/trashCan.svg?react';
import {
    PathViewContextAction,
    PathViewContextValue,
} from '@/features/path/path-view/PathViewContextProvider';
import { useDisclosure } from '@/hooks/useDisclosure';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

import * as S from './PathControlBox.css';

interface PropsType {
    id: string;
    name: string;
    address: string;
}

const PathControlBox = ({ id, name, address }: PropsType) => {
    const { selectedId } = useContext(PathViewContextValue);
    const { setSelectedId } = useContext(PathViewContextAction);

    const pathInputRef = useRef<HTMLInputElement | null>(null);
    const [modifiedPathName, setModifiedPathName] = useState(name);

    const { value: isModifyPathName, toggle: toggleModifyPathName } =
        useDisclosure(false);

    const isSelected = selectedId === id;
    const isDisabledPathInput = !isSelected || !isModifyPathName;

    const handleModifyPathName = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setModifiedPathName(event.target.value);
    };

    const handleInputOutsideClick = () => {
        if (!isModifyPathName) return;
        toggleModifyPathName();
        setSelectedId(null);
    };

    const handleModifyIconClick = () => {
        if (!pathInputRef.current) return;
        if (!isModifyPathName) pathInputRef.current.focus();
        toggleModifyPathName();
    };

    useOnClickOutside({
        ref: pathInputRef,
        handler: handleInputOutsideClick,
    });

    return (
        <div className={S.wrapper}>
            <div className={S.pathBox}>
                <input
                    ref={pathInputRef}
                    className={S.pathName}
                    value={modifiedPathName}
                    onChange={handleModifyPathName}
                    disabled={isDisabledPathInput}
                />
                <div className={S.addressBox}>
                    <LocationIcon
                        width={14}
                        height={14}
                        className={S.addressIcon}
                    />
                    <p className={S.address}>{address}</p>
                </div>
            </div>
            {isSelected && (
                <div className={S.controlBox}>
                    <TrashCanIcon
                        className={S.controlIcon}
                        width={32}
                        height={32}
                    />
                    <ModifyIcon
                        onClick={handleModifyIconClick}
                        className={S.controlIcon}
                        width={32}
                        height={32}
                    />
                </div>
            )}
        </div>
    );
};

export default PathControlBox;
