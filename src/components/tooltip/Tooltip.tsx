import TailImage from '@/assets/images/tail.svg?react';

import * as S from './Tooltip.css';

interface PropsType {
    isOnline: boolean;
    name: string;
}

const Tooltip = ({ isOnline, name }: PropsType) => {
    return (
        <div className={S.layout}>
            <TailImage className={S.tailImage({ isOnline })} />
            <div className={S.tooltipBody({ isOnline })}>
                <p className={S.name}>{name}</p>
                <p className={S.status}>{isOnline ? 'Online' : 'Offline'}</p>
            </div>
        </div>
    );
};

export default Tooltip;
