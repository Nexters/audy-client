import AudyLogoIcon from '@/assets/icons/audyLogo.svg?react';
import SettingIcon from '@/assets/icons/setting.svg?react';

import * as S from './GlobalNavigationBar.css';

const GlobalNavigationBar = () => (
    <div className={S.wrapper}>
        <AudyLogoIcon />
        <p className={S.savingStatus}>수정된 코스 저장중...</p>
        <SettingIcon className={S.settingIcon} />
    </div>
);

export default GlobalNavigationBar;
