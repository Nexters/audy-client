import type { ComponentProps } from 'react';

import clsx from 'clsx';

import { useModal } from '@/hooks/useModal';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

import * as S from './Modal.css';
import ModalContent from './ModalContent';
import ModalFooter from './ModalFooter';
import ModalTitle from './ModalTitle';

interface PropsType extends ComponentProps<'div'> {}

const ModalRoot = ({ children, className, ...restProps }: PropsType) => {
    const { closeModal } = useModal();

    const { targetRef: contentRef } = useOnClickOutside({
        onClickOutside: closeModal,
    });

    return (
        <div
            className={clsx(S.wrapper, className)}
            ref={contentRef}
            {...restProps}
        >
            {children}
        </div>
    );
};

const Modal = Object.assign(ModalRoot, {
    Title: ModalTitle,
    Content: ModalContent,
    Footer: ModalFooter,
});

export default Modal;
