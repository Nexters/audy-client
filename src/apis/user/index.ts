import { type ApiResponseType, getAsync } from '@/apis/api';

import { type UserResponseType } from './type';

export const UserRepository = {
    // 유저 ID, 프로필 URL, 닉네임, 이메일 정보를 반환하는 메서드 getInformationAsync
    async getInformationAsync(userId?: string) {
        const response = await getAsync<ApiResponseType<UserResponseType['getInformation']>>(
            '/v1/users',
            {
                params: {
                    ...(userId && { userId }),
                },
            },
        );
        return response.data;
    },
};
