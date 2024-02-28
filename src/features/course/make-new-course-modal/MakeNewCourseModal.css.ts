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

export const couseNameInput = style({
    border: `1px solid ${COLOR.Gray200}`,
    width: '100%',
    flex: 1,
    padding: '16px',
    borderRadius: '6px',
});

export const saveButton = recipe({
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
