import { ApiResponseType, postAsync } from '@/apis/api';

import type { EditorRequestParamType, EditorResponseType } from './type';

export const EditorRepository = {
    async postInviteEditorAsync(inviteCode: string) {
        const response = await postAsync<
            ApiResponseType<EditorResponseType['postInviteEditor']>,
            EditorRequestParamType['postInviteEditor']
        >(`/v1/editors`, {
            key: inviteCode,
        });
        return response.data;
    },
};
