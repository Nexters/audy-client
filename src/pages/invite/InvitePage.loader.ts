import { LoaderFunctionArgs, redirect } from 'react-router-dom';

import { EditorRepository } from '@/apis/editor';

export const invitePageLoader = async ({ params }: LoaderFunctionArgs) => {
    const { invitationCode } = params;

    if (!invitationCode) {
        return null;
    }

    try {
        const { courseId } =
            await EditorRepository.postInviteEditorAsync(invitationCode);
        return redirect(`/course/${courseId}`);
    } catch (error) {
        return null;
    }
};
