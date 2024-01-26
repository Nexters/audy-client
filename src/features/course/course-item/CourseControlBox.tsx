import { useContext, useRef, useState } from 'react';

import LocationIcon from '@/assets/icons/location.svg?react';
import ModifyIcon from '@/assets/icons/modify.svg?react';
import TrashCanIcon from '@/assets/icons/trashCan.svg?react';
import {
    CourseViewContextAction,
    CourseViewContextValue,
} from '@/features/course/course-view/CourseViewContextProvider';
import { useDisclosure } from '@/hooks/useDisclosure';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

import * as styles from './CourseControlBox.css';

interface PropsType {
    id: number;
    name: string;
    address: string;
}

const CourseControlBox = ({ id, name, address }: PropsType) => {
    const { selectedId } = useContext(CourseViewContextValue);
    const { setSelectedId } = useContext(CourseViewContextAction);

    const courseInputRef = useRef<HTMLInputElement | null>(null);
    const [modifiedCourseName, setModifiedCourseName] = useState(name);

    const { value: isModifyCourseName, toggle: toggleModifyCourseName } =
        useDisclosure(false);

    const isSelected = selectedId === id;
    const isDisabledCourseInput = !isSelected || !isModifyCourseName;

    const handleModifyCourseName = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setModifiedCourseName(event.target.value);
    };

    const handleClickInputOutside = () => {
        if (!isModifyCourseName) return;
        toggleModifyCourseName();
        setSelectedId(null);
    };

    const handleClickModifyIcon = () => {
        if (!courseInputRef.current) return;
        if (!isModifyCourseName) courseInputRef.current.focus();
        toggleModifyCourseName();
    };

    useOnClickOutside({
        ref: courseInputRef,
        handler: handleClickInputOutside,
    });

    return (
        <div className={styles.wrapper}>
            <div className={styles.courseBox}>
                <input
                    ref={courseInputRef}
                    className={styles.courseName}
                    value={modifiedCourseName}
                    onChange={handleModifyCourseName}
                    disabled={isDisabledCourseInput}
                />
                <div className={styles.addressBox}>
                    <LocationIcon
                        width={14}
                        height={14}
                        className={styles.addressIcon}
                    />
                    <p className={styles.address}>{address}</p>
                </div>
            </div>
            {isSelected && (
                <div className={styles.controlBox}>
                    <TrashCanIcon
                        className={styles.controlIcon}
                        width={32}
                        height={32}
                    />
                    <ModifyIcon
                        onClick={handleClickModifyIcon}
                        className={styles.controlIcon}
                        width={32}
                        height={32}
                    />
                </div>
            )}
        </div>
    );
};

export default CourseControlBox;
