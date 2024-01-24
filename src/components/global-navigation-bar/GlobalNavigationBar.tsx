import AudyLogoIcon from '@/assets/icons/audyLogo.svg?react';
import SettingIcon from '@/assets/icons/setting.svg?react';

import * as styles from './GlobalNavigationBar.css';

const GlobalNavigationBar = () => (
    <div className={styles.wrapper}>
        <AudyLogoIcon />
        <p className={styles.savingStatus}>수정된 코스 저장중...</p>
        <SettingIcon className={styles.settingIcon} />
    </div>
);

export default GlobalNavigationBar;
