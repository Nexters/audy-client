import { ComponentProps, MouseEvent } from 'react';

import { useDialogContext } from './Dialog';

interface PropsType extends ComponentProps<'div'> {}

const DialogClose = ({
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

    return (
        <div
            onClick={handleDialogCloseClick}
            className={className}
            {...restProps}
        >
            {children}
        </div>
    );
};

export default DialogClose;