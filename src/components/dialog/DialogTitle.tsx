import { ComponentProps } from 'react';

import clsx from 'clsx';

import * as S from './Dialog.css';

interface PropsType extends ComponentProps<'h2'> {
    children: string; // NOTE : 텍스트만을 받기 위해 children Props Override
}

const DialogTitle = ({ children, className, ...restProps }: PropsType) => (
    <div className={S.header}>
        <h2 className={clsx(S.header, className)} {...restProps}>
            {children}
        </h2>
    </div>
);

export default DialogTitle;
