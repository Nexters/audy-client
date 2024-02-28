import { LoaderFunctionArgs, redirect } from 'react-router-dom';

import { EditorRepository } from '@/apis/editor';

import { isApiError } from '@/utils/error/ApiError';

export const invitePageLoader = async ({ params }: LoaderFunctionArgs) => {
    const { invitationCode } = params;

    if (!invitationCode) {
        return redirect('/')
    }

    try {
        const { courseId } =
            await EditorRepository.postInviteEditorAsync(invitationCode);
        return redirect(`/course/${courseId}`);
    } catch (error) {
        return isApiError(error) ? error.code : redirect('/')
    }
};
