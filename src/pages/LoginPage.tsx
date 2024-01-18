export default function LoginPage() {
    const KAKAO_REST_API_KEY = ''; // TODO: 임시 KEY
    const KAKAO_REDIRECT_URI = 'http://localhost:5173/redirect'; // TODO: 임시 URL
    const kakaoLoginLink = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

    const handleLogin = () => (window.location.href = kakaoLoginLink);
    return (
        <div>
            <button type="button" onClick={handleLogin}>
                카카오로 로그인
            </button>
        </div>
    );
}
