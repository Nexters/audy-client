import * as S from './SidePanel.css';

interface PropsType {
    children: React.ReactNode;
}

const SidePanel = ({ children }: PropsType) => {
    return <div className={S.sidePanel}>{children}</div>;
};

export default SidePanel;
