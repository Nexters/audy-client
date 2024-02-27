import { ComponentProps, MouseEvent } from 'react';

import { useDialogContext } from './Dialog';
import Slot from '@/components/slot';

interface PropsType extends ComponentProps<'div'> {
    asChild?: boolean;
}

const DialogClose = ({
    asChild,
    children,
    className,
    onClick,
    ...restProps
}: PropsType) => {
    const { closeDialog } = useDialogContext();

    const handleDialogCloseClick = (event: MouseEvent<HTMLDivElement>) => {
        onClick?.(event);
        closeDialog();
    };

    const RenderedComponent = asChild ? Slot : 'div'

    return (
        <RenderedComponent
            onClick={handleDialogCloseClick}
            className={className}
            {...restProps}
        >
            {children}
        </RenderedComponent>
    );
};

export default DialogClose;