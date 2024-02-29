import { style } from '@vanilla-extract/css';

import { COLOR } from '@/styles/foundation';
import { sprinkles } from '@/styles/sprinkle.css';

export const orderBox = style({
    flexShrink: 0,
    flexGrow: 0,
    cursor: 'pointer',
});

export const orderRect = style({
    width: '24px',
    height: '24px',
    flexShrink: 0,

    fill: COLOR.MonoWhite,
    stroke: COLOR.Gray300,
    strokeWidth: 1,
    strokeLinejoin: 'round',
});

export const orderText = style([
    sprinkles({ typography: 'Bold16' }),
    {
        color: COLOR.Gray700,
        textAnchor: 'middle',
        dominantBaseline: 'central',
    },
]);

export const checkIcon = style({
    fill: COLOR.IndigoPrimary,
});
