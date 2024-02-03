import { getAsync } from '@/apis/api';

import { type UserRequestParamsType, type UserResponseType } from './type';

export const UserRepository = {
    // 유저 ID, 프로필 URL, 닉네임, 이메일 정보를 반환하는 메서드 getInformationAsync
    async getInformationAsync({
        accessToken,
        userId,
    }: UserRequestParamsType['getInformation']) {
        return getAsync<UserResponseType['getInformation']>('/v1/users', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                userId,
            },
        });
    },
};
