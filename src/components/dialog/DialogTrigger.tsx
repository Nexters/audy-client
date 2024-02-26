import type { ComponentProps, MouseEvent } from 'react';

import { useDialogContext } from './Dialog';

interface PropsType extends ComponentProps<'div'> {}

const DialogTrigger = ({
    className,
    children,
    onClick,
    ...restProps
}: PropsType) => {
    const { isDialogOpen, openDialog, closeDialog } = useDialogContext();

    const toggleDialog = () => (isDialogOpen ? closeDialog() : openDialog());

    const handleDialogTriggerClick = (event: MouseEvent<HTMLDivElement>) => {
        onClick?.(event);
        toggleDialog();
    };

    return (
        <div
            onClick={handleDialogTriggerClick}
            className={className}
            {...restProps}
        >
            {children}
        </div>
    );
};

export default DialogTrigger;
