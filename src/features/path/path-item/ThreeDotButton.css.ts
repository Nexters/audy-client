import { recipe } from '@vanilla-extract/recipes';

export const pathPopover = recipe({
    variants: {
        isClicked: {
            true: { display: 'flex' },
            false: { display: 'none' },
        },
    },
});
