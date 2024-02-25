import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { COLOR } from '@/styles/foundation';
import { sprinkles } from '@/styles/sprinkle.css';

export const wrapper = recipe({
    base: {
        maxWidth: '429px',
        padding: '16px 12px 16px 8px',

        display: 'flex',
        alignItems: 'center',
        flexShrink: 0,
    },

    variants: {
        status: {
            selected: {
                borderRadius: '100px',
                backgroundColor: `${COLOR.MonoBlack}08`,
            },
            none: {},
        },
    },
});

export const listIcon = style({
    margin: '10px',
    cursor: 'pointer',
    flexShrink: 0,
    flexGrow: 0,
});

export const orderBox = style([
    sprinkles({ typography: 'SemiBold16' }),
    {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '26px',
        height: '26px',
        borderRadius: '4px',
        border: `1px solid ${COLOR.Gray300}`,
        color: COLOR.Gray500,
        margin: '0 12px 0 0',
    },
]);
