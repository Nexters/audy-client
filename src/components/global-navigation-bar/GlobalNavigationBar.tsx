import AudyLogoIcon from '@/assets/icons/audyLogo.svg?react';
import SettingIcon from '@/assets/icons/setting.svg?react';
import PopOver from '@/components/pop-over';
import SignOutModal from '@/features/auth/sign-out-modal';
import WithdrawModal from '@/features/auth/withdraw-modal';
import { useModal } from '@/hooks/useModal';

import * as S from './GlobalNavigationBar.css';

const GlobalNavigationBar = () => {
    const { openModal } = useModal();

    const handleSignOutButtonClick = () => {
        openModal(<SignOutModal />);
    };

    const handleWithdrawButtonClick = () => {
        openModal(<WithdrawModal />);
    };

    return (
        <div className={S.wrapper}>
            <AudyLogoIcon />
            <p className={S.savingStatus}>수정된 코스 저장중...</p>
            <PopOver>
                <PopOver.Trigger>
                    <SettingIcon className={S.settingIcon} />
                </PopOver.Trigger>
                <PopOver.Content className={S.settingContent}>
                    <PopOver.Item onClick={handleSignOutButtonClick}>
                        <p className={S.logoutText}>로그아웃</p>
                    </PopOver.Item>
                    <PopOver.Item onClick={handleWithdrawButtonClick}>
                        <p className={S.withdrawText}>회원탈퇴</p>
                    </PopOver.Item>
                </PopOver.Content>
            </PopOver>
        </div>
    );
};

export default GlobalNavigationBar;
