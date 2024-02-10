import LeftArrowIcon from '@/assets/icons/leftArrow.svg?react';
import MyCourseIcon from '@/assets/icons/myCourse.svg?react';
import PersonIcon from '@/assets/icons/person.svg?react';
import PinIcon from '@/assets/icons/pin.svg?react';

import * as S from './CourseTab.css';

interface PropsType {
    name: string;
    memberCount: number;
    pinCount: number;
    isMyCourse: boolean;
}

const CourseTab = ({ name, memberCount, pinCount, isMyCourse }: PropsType) => {
    return (
        <div className={S.layout}>
            <div>
                <div className={S.courseNameContainer}>
                    {isMyCourse && <MyCourseIcon fill="#FF4D86" />}
                    <p className={S.courseName}>{name}</p>
                </div>

                <div className={S.courseDetailsContainer}>
                    <div className={S.courseDetailWrapper}>
                        <PersonIcon fill="#9CA3AF" height={14} width={14} />
                        <p className={S.courseDetail}>
                            {memberCount}명 참여 중
                        </p>
                    </div>

                    <div className={S.divider} />

                    <div className={S.courseDetailWrapper}>
                        <PinIcon fill="#9CA3AF" height={14} width={14} />
                        <p className={S.courseDetail}>
                            {pinCount}개의 핀 저장됨
                        </p>
                    </div>
                </div>
            </div>

            <LeftArrowIcon
                transform="scale(-1, 1)"
                fill="#6B7280"
                height={24}
                width={24}
            />
        </div>
    );
};

export default CourseTab;
