import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import AddIcon from '@/assets/icons/add.svg?react';
import EditorInviteModal from '@/features/user/editor-invite-modal';
import EditorProfile from '@/features/user/editor-profile';
import { useEventListeners } from '@/hooks/useEventListeners';
import { useModal } from '@/hooks/useModal';
import { useSocket } from '@/hooks/useSocket';
import { useGetCourseDetail } from '@/query-hooks/course/query';
import { COLOR } from '@/styles/foundation';
import { EditorType } from '@/types/editor';

import * as S from './EditorList.css';

const EditorList = () => {
    const { openModal } = useModal();
    const { courseId } = useParams();
    const stompClient = useSocket(Number(courseId));

    const {
        data: { editorGetResList },
    } = useGetCourseDetail({ courseId: Number(courseId) });

    const [editorList, setEditorList] =
        useState<EditorType[]>(editorGetResList);

    const handleInvitationButtonClick = () => {
        if (!courseId) return;
        openModal(<EditorInviteModal courseId={Number(courseId)} />);
    };

    useEventListeners('user:list', (event) => {
        const { users } = event.detail;
        const joinedUserIdList = users.map(({ userId }) => userId);
        const updatedEditorList = editorList.map((editor) => ({
            ...editor,
            isOnline: joinedUserIdList.includes(editor.userId),
        }));
        setEditorList(updatedEditorList);
    });

    useEffect(() => {
        return () => stompClient.leaveCourse();
    }, [stompClient]);

    return (
        <div className={S.layout}>
            {editorList.map(({ imageUrl, userName, isOnline }, index) => (
                <EditorProfile
                    key={index}
                    profileImageUrl={imageUrl}
                    isOnline={!!isOnline}
                    editorName={userName}
                />
            ))}

            {editorList.length < 5 && (
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
