import { useParams } from 'react-router-dom';

import AddIcon from '@/assets/icons/add.svg?react';
import CourseInviteModal from '@/features/course/course-invite-modal';
import EditorProfile from '@/features/user/editor-profile';
import { useModal } from '@/hooks/useModal';
import { COLOR } from '@/styles/foundation';

import * as S from './EditorList.css';

const tempArr = [
    // TODO: 서버에서 데이터 받아오는 방식으로 수정해야 함
    {
        profileImageUrl:
            'https://i.pinimg.com/736x/a4/88/4a/a4884a65ac24c56d6446b08e4daed6f2.jpg',
        isOnline: true,
        editorName: '김가은',
    },
    {
        profileImageUrl:
            'https://mblogthumb-phinf.pstatic.net/MjAxODAzMTJfMjY4/MDAxNTIwNzk2NTI3ODAz.JMm0v9uPBYF0606VJJyQglt1swlEnMSrFkHu5jSXv28g.iSBfAUGxOl-UWxSa7BKOt0Aak_tTa-jnY2wCv9KeK4Ug.JPEG.x3x1121/27581124_1582122411908308_4737737849661554688_n.jpg?type=w800',
        isOnline: false,
        editorName: '백광인',
    },
    {
        profileImageUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm-aOX9sTvS1y3t0IvP-vbvhNKnHpUQ-crSf3zJENQQ4qYu4_0xn_1jLODZdGyfpGdMEo&usqp=CAU',
        isOnline: false,
        editorName: '지코',
    },
];

const EditorList = () => {
    const { openModal } = useModal();
    const { courseId } = useParams();

    const handleInvitationButtonClick = () => {
        if (!courseId) return;
        openModal(<CourseInviteModal courseId={Number(courseId)} />);
    };

    return (
        <div className={S.layout}>
            {tempArr.map(({ profileImageUrl, isOnline, editorName }, index) => {
                return (
                    <EditorProfile
                        key={index}
                        profileImageUrl={profileImageUrl}
                        isOnline={isOnline}
                        editorName={editorName}
                    />
                );
            })}

            {tempArr.length < 5 && (
                <button
                    className={S.editorInviteButton}
                    onClick={handleInvitationButtonClick}
                >
                    <AddIcon fill={COLOR.MonoWhite} width={20} height={20} />
                </button>
            )}
        </div>
    );
};

export default EditorList;
