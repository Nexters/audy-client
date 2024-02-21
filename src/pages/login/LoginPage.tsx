import AppleLogoIcon from '@/assets/icons/appleLogo.svg?react';
import AudyLogoIcon from '@/assets/icons/audyLogo.svg?react';
import KakaoLogoIcon from '@/assets/icons/kakaoLogo.svg?react';
import { SocialPlatformType } from '@/types';

import * as S from './LoginPage.css';

const LoginPage = () => {
    const handleLoginButtonClick = (socialType: SocialPlatformType) => {
        const redirectUrl = `${import.meta.env.VITE_SERVER_URL}/oauth2/authorization/${socialType}`;

        window.location.href = redirectUrl.toString();
    };

    return (
        <div className={S.wrapper}>
            <section className={S.loginContainer}>
                <div className={S.introduceBox}>
                    <AudyLogoIcon className={S.audyLogo} />
                    <h5 className={S.introduceText}>함께 만드는 여행 지도</h5>
                    <p className={S.sloganText}>
                        어디갈지 고민하는 당신들을 위한 서비스
                    </p>
                </div>
                <div className={S.buttonBox}>
                    <p className={S.loginNoticeText}>
                        소셜 로그인으로 빠른 시작
                    </p>
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
