import AudyLogoIcon from '@/assets/icons/audyLogo.svg?react';
import SettingIcon from '@/assets/icons/setting.svg?react';
import PopOver from '@/components/pop-over';
import SignOutModal from '@/features/auth/sign-out-modal/SignOutModal';
import { useDisclosure } from '@/hooks/useDisclosure';
import { useModal } from '@/hooks/useModal';

import * as S from './GlobalNavigationBar.css';

const GlobalNavigationBar = () => {
    const { value: isSignOutModalOpen, open: openSignOutModal } =
        useDisclosure(false);

    const { openModal } = useModal();

    const handleSignOutButtonClick = () => {
        openModal(<SignOutModal />);
    };

    return (
        <>
            <div className={S.wrapper}>
                <AudyLogoIcon />
                <p className={S.savingStatus}>수정된 코스 저장중...</p>
                <PopOver>
                    <PopOver.Trigger>
                        <SettingIcon className={S.settingIcon} />
                    </PopOver.Trigger>
                    <PopOver.Content className={S.settingContent}>
                        <PopOver.Item
                            className={S.logoutText}
                            onClick={handleSignOutButtonClick}
                        >
                            <p onClick={openSignOutModal}>로그아웃</p>
                        </PopOver.Item>
                        <PopOver.Item className={S.withdrawText}>
                            <p>회원탈퇴</p>
                        </PopOver.Item>
                    </PopOver.Content>
                </PopOver>
            </div>
            {isSignOutModalOpen && <SignOutModal />}
        </>
    );
};

export default GlobalNavigationBar;
