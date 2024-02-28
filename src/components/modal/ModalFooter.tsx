import type { ComponentProps } from 'react';

import clsx from 'clsx';

import * as S from './Modal.css';

interface PropsType extends ComponentProps<'div'> {}

const ModalFooter = ({ children, className, ...restProps }: PropsType) => (
    <div className={clsx(S.footer, className)} {...restProps}>
        {children}
    </div>
);

export default ModalFooter;
