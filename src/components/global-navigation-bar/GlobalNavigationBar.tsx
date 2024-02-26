import AudyLogoIcon from '@/assets/icons/audyLogo.svg?react';
import SettingIcon from '@/assets/icons/setting.svg?react';
import PopOver from '@/components/pop-over';

import * as S from './GlobalNavigationBar.css';

const GlobalNavigationBar = () => (
    <div className={S.wrapper}>
        <AudyLogoIcon />
        <p className={S.savingStatus}>수정된 코스 저장중...</p>
        <PopOver>
            <PopOver.Trigger>
                <SettingIcon className={S.settingIcon} />
            </PopOver.Trigger>
            <PopOver.Content className={S.settingContent}>
                <PopOver.Item className={S.logoutText} >
                    <p>로그아웃</p>
                </PopOver.Item>
                <PopOver.Item className={S.withdrawText}>
                    <p>회원탈퇴</p>
                </PopOver.Item>
            </PopOver.Content>
        </PopOver>
    </div>
);

export default GlobalNavigationBar;
