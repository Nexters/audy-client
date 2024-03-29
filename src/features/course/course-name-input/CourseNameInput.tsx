import { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import LeftArrowIcon from '@/assets/icons/leftArrow.svg?react';
import ModifyFilledIcon from '@/assets/icons/modifyFilled.svg?react';
import { usePatchCourseName } from '@/query-hooks/course/mutation';
import { useGetCourseDetail } from '@/query-hooks/course/query';
import { COLOR } from '@/styles/foundation';

import * as S from './CourseNameInput.css';

const CourseNameInput = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();

    const {
        data: { courseName },
    } = useGetCourseDetail({ courseId: Number(courseId) });

    const { mutate: updateCourseName } = usePatchCourseName({
        courseId: Number(courseId),
    });

    const [isCourseNameEditing, setIsCourseNameEditing] = useState(false);
    const [editedCourseName, setEditedCourseName] = useState(courseName);

    const handleCourseNameChange = ({
        target,
    }: React.ChangeEvent<HTMLInputElement>) =>
        setEditedCourseName(target.value);

    const handleCourseNameSave = async () => {
        updateCourseName(editedCourseName);
        setIsCourseNameEditing(false);
    };

    return (
        <div className={S.wrapper}>
            {isCourseNameEditing || (
                <button
                    onClick={() => navigate('/')}
                    className={S.goBackButton}
                >
                    <LeftArrowIcon
                        width={24}
                        height={24}
                        fill={COLOR.Gray900}
                    />
                </button>
            )}

            {isCourseNameEditing ? (
                <>
                    <input
                        type="text"
                        className={S.courseNameInput}
                        autoFocus
                        value={editedCourseName}
                        onChange={handleCourseNameChange}
                    />
                    <button
                        className={S.courseNameSaveButton}
                        onClick={handleCourseNameSave}
                    >
                        저장
                    </button>
                </>
            ) : (
                <>
                    <p className={S.courseName}>{editedCourseName}</p>
                    <button
                        className={S.courseNameEditButton}
                        onClick={() => setIsCourseNameEditing(true)}
                    >
                        <ModifyFilledIcon width={24} height={24} />
                    </button>
                </>
            )}
        </div>
    );
};

export default CourseNameInput;
