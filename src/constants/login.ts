// TODO: config 내에 정의된 임시 속성들에 대해서 추후 논의 후 수정 필요
export const SOCIAL_LOGIN_METADATA = {
    apple: {
        url: `${import.meta.env.VITE_SERVER_URL}/oauth2/authorization/kakao`,
        config: {
            client_id: import.meta.env.VITE_APPLE_CLIENT_ID,
            redirect_uri: import.meta.env.VITE_APPLE_REDIRECT_URL,
            response_type: 'code id_token',
            state: 'origin:web',
            scope: 'name email',
            response_mode: 'form_post',
            m: 11,
            v: '1.5.4',
        },
    },
    kakao: {
        url: `${import.meta.env.VITE_SERVER_URL}/oauth2/authorization/kakao`,
        config: {
            client_id: import.meta.env.VITE_KAKAO_CLIENT_ID,
            redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URL,
            response_type: 'code',
        },
    },
};
