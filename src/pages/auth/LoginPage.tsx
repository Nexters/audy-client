import AppleLogoIcon from '@/assets/icons/appleLogo.svg.svg?react';
import AudyLogoIcon from '@/assets/icons/audyLogo.svg?react';
import KakaoLogoIcon from '@/assets/icons/kakaoLogo.svg.svg?react';
import { SOCIAL_LOGIN_METADATA } from '@/constants';
import { SocialPlatformType } from '@/types';

import * as S from './LoginPage.css';

const LoginPage = () => {
    const handleLoginButtonClick = (socialType: SocialPlatformType) => {
        const { url, config } = SOCIAL_LOGIN_METADATA[socialType];

        const redirectUrl = new URL(url);
        Object.entries(config).map(([queryKey, value]) =>
            redirectUrl.searchParams.set(queryKey, value),
        );

        window.location.href = redirectUrl.toString();
    };

    return (
        <div className={S.wrapper}>
            <section className={S.loginContainer}>
                <div className={S.introduceBox}>
                    <AudyLogoIcon className={S.audyLogo} />
                    <h5 className={S.introduceText}>함께 만드는 여행 지도</h5>
                    <p className={S.loginNoticeText}>로그인 혹은 회원가입</p>
                </div>
                <div className={S.buttonBox}>
                    <button
                        className={S.loginButton({ socialType: 'kakao' })}
                        onClick={() => handleLoginButtonClick('kakao')}
                    >
                        <KakaoLogoIcon />
                        카카오 로그인
                    </button>

                    <button
                        className={S.loginButton({ socialType: 'apple' })}
                        onClick={() => handleLoginButtonClick('apple')}
                    >
                        <AppleLogoIcon />
                        Apple 로그인
                    </button>
                </div>
            </section>
        </div>
    );
};

export default LoginPage;
