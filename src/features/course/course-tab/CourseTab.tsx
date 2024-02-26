import MyCourseIcon from '@/assets/icons/myCourse.svg?react';
import PersonIcon from '@/assets/icons/person.svg?react';
import PinIcon from '@/assets/icons/pin.svg?react';
import { COLOR } from '@/styles/foundation';

import * as S from './CourseTab.css';
import ThreeDotButton from './ThreeDotButton';

interface PropsType {
    courseId: number;
    courseName: string;
    memberCount: number;
    pinCount: number;
    isMyCourse: boolean;
}

const CourseTab = ({
    courseId,
    courseName,
    memberCount,
    pinCount,
    isMyCourse,
}: PropsType) => {
    return (
        <div className={S.layout}>
            <div>
                <div className={S.courseNameContainer}>
                    {isMyCourse && <MyCourseIcon fill={COLOR.PinkPrimary} />}
                    <p className={S.courseName}>{courseName}</p>
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
            <ThreeDotButton courseId={courseId} />
        </div>
    );
};

export default CourseTab;
