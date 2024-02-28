import { LoaderFunctionArgs, redirect } from 'react-router-dom';

import { EditorRepository } from '@/apis/editor';

export const invitePageLoader = async ({ params }: LoaderFunctionArgs) => {
    const { invitationCode } = params;

    console.log(invitationCode);

    if (!invitationCode) {
        return null;
    }

    try {
        const response =
            await EditorRepository.postInviteEditorAsync(invitationCode);

        console.log(response);

        if (!response?.data.courseId) {
            return response;
        }

        return redirect(`/course/${response.data.courseId}`);
    } catch (error) {
        return error;
    }
};
