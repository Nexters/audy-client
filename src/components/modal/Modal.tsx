import type { ComponentProps } from 'react';

import clsx from 'clsx';

import * as S from './Modal.css';
import ModalContent from './ModalContent';
import ModalFooter from './ModalFooter';
import ModalTitle from './ModalTitle';

interface PropsType extends ComponentProps<'div'> {}

const ModalRoot = ({ children, className, ...restProps }: PropsType) => (
    <div className={clsx(S.wrapper, className)} {...restProps}>
        {children}
    </div>
);

const Modal = Object.assign(ModalRoot, {
    Title: ModalTitle,
    Content: ModalContent,
    Footer: ModalFooter,
});

export default Modal;
