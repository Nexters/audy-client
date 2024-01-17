export default function LoginPage() {
    const appleLoginConfig = {
        client_id: import.meta.env.VITE_APPLE_CLIENT_ID as string,
        redirect_uri: import.meta.env.VITE_APPLE_REDIRECT_URL as string,
        response_type: 'code id_token',
        state: 'origin:web',
        scope: 'name email',
        response_mode: 'form_post',
        m: 11,
        v: '1.5.4',
        // TODO: 임시 속성들. 추후 논의 후 수정해야 함
    };

    const kakaoLoginConfig = {
        client_id: import.meta.env.VITE_LOGIN_CLIENT_ID as string,
        redirect_uri: import.meta.env.VITE_KAKAO_REDIRECTION_URL as string,
        response_type: 'code',
    };

    const makeQueryString = (
        config: Record<string, string | number | boolean>,
    ) => {
        return Object.entries(config)
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join('&');
    };

    const kakaoLoginLink = `https://kauth.kakao.com/oauth/authorize?${makeQueryString(kakaoLoginConfig)}`;
    const appleLoginLink = `https://appleid.apple.com/auth/authorize?${makeQueryString(appleLoginConfig)}`;

    const handleKakaoLogin = () => (window.location.href = kakaoLoginLink);
    const handleAppleLogin = () => (window.location.href = appleLoginLink);

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
