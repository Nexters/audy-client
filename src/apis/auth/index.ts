import { getAsync } from '@/apis/api';

import { type AuthRequestParamsType, type AuthResponseType } from './type';

export const AuthRepository = {
    // 소셜 플랫폼으로부터 받은 인가 Code 를 기반으로 유저 인증을 진행하는 메서드 getAuthorizationAsync
    async getAuthorizationAsync({
        code,
        socialPlatform,
    }: AuthRequestParamsType['getAuthorization']) {
        return getAsync<AuthResponseType['getAuthorization']>(`/v1/users/${socialPlatform}`, {
            params: {
                code,
            },
        });
    },
};
