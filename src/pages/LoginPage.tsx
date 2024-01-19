export default function LoginPage() {
    type SocialLoginProvider = 'apple' | 'kakao';

    const socialLoginProvider = {
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

    const makeQueryString = (
        config: Record<string, string | number | boolean>,
    ) => {
        return Object.entries(config)
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join('&');
    };

    const makeSocialLoginUrl = (provider: SocialLoginProvider) => {
        const { url, config } = socialLoginProvider[provider];
        const queryString = makeQueryString(config);

        return `${url}?${queryString}`;
    };

    const handleKakaoLogin = () => {
        window.location.href = makeSocialLoginUrl('kakao');
    };

    const handleAppleLogin = () => {
        window.location.href = makeSocialLoginUrl('apple');
    };

    return (
        <div>
            <button type="button" onClick={handleKakaoLogin}>
                카카오로 로그인
            </button>
            <button type="button" onClick={handleAppleLogin}>
                애플로 로그인
            </button>
        </div>
    );
}
