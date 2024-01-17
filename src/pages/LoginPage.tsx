export default function LoginPage() {
    const kakaoLoginLink = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECTION_URL}&response_type=code`;

    const handleKakaoLogin = () => {
        window.location.href = kakaoLoginLink;
    };

    return (
        <div>
            <button type="button" onClick={handleKakaoLogin}>
                카카오로 로그인
            </button>
        </div>
    );
}
