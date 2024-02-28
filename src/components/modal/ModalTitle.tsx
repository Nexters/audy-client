import { ComponentProps } from 'react';

import clsx from 'clsx';

import * as S from './Modal.css';

interface PropsType extends ComponentProps<'h2'> {
    children: string; // NOTE : 텍스트만을 받기 위해 children Props Override
}

const ModalTitle = ({ children, className, ...restProps }: PropsType) => (
    <h2 className={clsx(S.header, className)} {...restProps}>
        {children}
    </h2>
);

export default ModalTitle;
