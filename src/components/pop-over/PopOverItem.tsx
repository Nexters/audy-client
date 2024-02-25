import { type ComponentProps } from 'react';

import * as S from './PopOver.css';

const PopOverItem = ({ children }: ComponentProps<"button">) => {
    return <button className={S.item}>{children}</button>;
};

export default PopOverItem;
