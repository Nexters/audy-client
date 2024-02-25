import { type PropsWithChildren } from 'react';

import * as S from './PopOver.css';

const PopOverItem = ({ children }: PropsWithChildren) => {
    return <div className={S.item}>{children}</div>;
};

export default PopOverItem;
