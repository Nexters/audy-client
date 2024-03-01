import { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

import AudyLogoIcon from '@/assets/icons/audyLogo.svg?react';
import SettingIcon from '@/assets/icons/setting.svg?react';
import PopOver from '@/components/pop-over';
import SignOutModal from '@/features/auth/sign-out-modal';
import WithdrawModal from '@/features/auth/withdraw-modal';
import EditorList from '@/features/user/editor-list';
import { useModal } from '@/hooks/useModal';
import { COLOR } from '@/styles/foundation';

import * as S from './GlobalNavigationBar.css';

const GlobalNavigationBar = () => {
    const { pathname } = useLocation();
    const { openModal } = useModal();

    const [isSaving, setIsSaving] = useState(false);

    const isCoursePage = pathname.split('/')[1] === 'course';

    const handleSignOutButtonClick = () => openModal(<SignOutModal />);
    const handleWithdrawButtonClick = () => openModal(<WithdrawModal />);

    useEffect(() => {
        const isMac = navigator.userAgent.includes('Mac');
        const controlKey = isMac ? 'Meta' : 'Control';

        const handleKeyDown = (event: KeyboardEvent) => {
            if (controlKey && (event.key === 's' || event.key === 'ㄴ')) {
                event.preventDefault();
                setIsSaving(true);
            }
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            if (controlKey && (event.key === 's' || event.key === 'ㄴ')) {
                setTimeout(() => setIsSaving(false), 2000);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return (
        <div className={S.wrapper}>
            <div className={S.leftContainer}>
                <AudyLogoIcon />
                {isSaving && (
                    <p className={S.savingStatus}>수정된 코스 저장중...</p>
                )}
            </div>

            <div className={S.rightContainer}>
                {isCoursePage && <EditorList />}

                <PopOver>
                    <PopOver.Trigger>
                        <button className={S.settingButton}>
                            <SettingIcon fill={COLOR.Gray500} />
                        </button>
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
        </div>
    );
};

export default GlobalNavigationBar;
