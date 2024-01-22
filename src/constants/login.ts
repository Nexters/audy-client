export const socialLoginProvider = {
    apple: {
        url: 'https://appleid.apple.com/auth/authorize',
        config: {
            client_id: import.meta.env.VITE_APPLE_CLIENT_ID,
            redirect_uri: import.meta.env.VITE_APPLE_REDIRECT_URL,
            response_type: 'code id_token',
            state: 'origin:web',
            scope: 'name email',
            response_mode: 'form_post',
            m: 11,
            v: '1.5.4',
            // TODO: 임시 속성들. 추후 논의 후 수정해야 함
        },
    },
    kakao: {
        url: 'https://kauth.kakao.com/oauth/authorize',
        config: {
            client_id: import.meta.env.VITE_KAKAO_CLIENT_ID,
            redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URL,
            response_type: 'code',
        },
    },
};
