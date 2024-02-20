import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const threeDotButton = style({
    padding: '10px',
});

export const pathPopover = recipe({
    variants: {
        isClicked: {
            true: { display: 'flex' },
            false: { display: 'none' },
        },
    },
});