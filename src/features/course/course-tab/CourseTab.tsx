import { useState } from 'react';

import LeftArrowIcon from '@/assets/icons/leftArrow.svg?react';
import MyCourseIcon from '@/assets/icons/myCourse.svg?react';
import PersonIcon from '@/assets/icons/person.svg?react';
import PinIcon from '@/assets/icons/pin.svg?react';
import TrashCanIcon from '@/assets/icons/trashCan.svg?react';
import { COLOR } from '@/styles/foundation';

import * as S from './CourseTab.css';

interface PropsType {
    name: string;
    memberCount: number;
    pinCount: number;
    isMyCourse: boolean;
}

const CourseTab = ({ name, memberCount, pinCount, isMyCourse }: PropsType) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={S.layout}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div>
                <div className={S.courseNameContainer}>
                    {isMyCourse && <MyCourseIcon fill={COLOR.PinkPrimary} />}
                    <p className={S.courseName}>{name}</p>
                </div>

                <div className={S.courseDetailsContainer}>
                    <div className={S.courseDetailWrapper}>
                        <PersonIcon
                            fill={COLOR.Gray400}
                            height={14}
                            width={14}
                        />
                        <p className={S.courseDetail}>
                            {memberCount}명 참여 중
                        </p>
                    </div>

                    <div className={S.divider} />

                    <div className={S.courseDetailWrapper}>
                        <PinIcon fill={COLOR.Gray400} height={14} width={14} />
                        <p className={S.courseDetail}>
                            {pinCount}개의 핀 저장됨
                        </p>
                    </div>
                </div>
            </div>

            <div className={S.courseActionsContainer}>
                <button className={S.removeButton({ isHovered })}>
                    <TrashCanIcon fill={COLOR.Gray400} />
                </button>
                <LeftArrowIcon
                    transform="scale(-1, 1)"
                    fill={COLOR.Gray500}
                    height={24}
                    width={24}
                />
            </div>
        </div>
    );
};

export default CourseTab;
