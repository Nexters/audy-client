import { PropsWithChildren } from 'react';

import * as S from './SidePanel.css';

const SidePanel = ({ children }: PropsWithChildren) => {
    return <div className={S.sidePanel}>{children}</div>;
};

export default SidePanel;
