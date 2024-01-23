import { socialLoginProvider } from '@/constants';
import { SocialLoginProviderType } from '@/types';

export default function LoginPage() {
    const makeQueryString = (
        config: Record<string, string | number | boolean>,
    ) => {
        return Object.entries(config)
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join('&');
    };
    
    const makeSocialLoginUrl = (provider: SocialLoginProviderType) => {
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
