import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { COLOR } from '@/styles/foundation';
import { sprinkles } from '@/styles/sprinkle.css';

export const layout = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 'max-content',
    position: 'absolute',
});

export const tooltipBody = recipe({
    base: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px 24px 12px 24px',
        gap: '6px',
        width: 'max-content',
        borderRadius: '16px',
    },
    variants: {
        isOnline: {
            true: {
                backgroundColor: COLOR.PurplePrimary,
            },
            false: {
                backgroundColor: COLOR.Gray400,
            },
        },
    },
});

export const tailImage = recipe({
    variants: {
        isOnline: {
            true: {
                color: COLOR.PurplePrimary,
            },
            false: {
                color: COLOR.Gray400,
            },
        },
    },
});

export const name = style([
    sprinkles({ typography: 'SemiBold16' }),
    {
        color: COLOR.MonoWhite,
    },
]);

export const status = style([
    sprinkles({ typography: 'Regular13' }),
    {
        color: COLOR.MonoWhite,
    },
]);
