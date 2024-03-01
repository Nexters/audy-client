import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { COLOR } from '@/styles/foundation';
import { sprinkles } from '@/styles/sprinkle.css';

export const modalHeader = style({
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
});

export const couseNameInput = style([
    sprinkles({ typography: 'Regular15' }),
    {
        border: `1px solid ${COLOR.Gray200}`,
        width: '100%',
        flex: 1,
        padding: '8px 12px',
        borderRadius: '6px',
        color: COLOR.Gray900,

        '::placeholder': {
            color: COLOR.Gray400,
        },
    },
]);

export const editButton = recipe({
    base: [
        sprinkles({ typography: 'Bold17' }),
        {
            height: '56px',
            flex: 1,
            textAlign: 'center',
            borderRadius: '10px',
            backgroundColor: COLOR.Gray900,
            color: COLOR.MonoWhite,
        },
    ],
    variants: {
        isButtonDisabled: {
            true: {
                backgroundColor: COLOR.Gray300,
                cursor: 'default',
            },
            false: {
                backgroundColor: COLOR.Gray900,
            },
        },
    },
});

export const modalCloseButton = style({
    padding: '6px',
    color: COLOR.Gray400,
});
