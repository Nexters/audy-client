import { style } from '@vanilla-extract/css';

import { COLOR } from '@/styles/foundation';

export const searchBox = style({
    width: '100%',

    borderRadius: '6px',
    border: '1px solid transparent',

    backgroundImage: COLOR.GradientLinear,
    backgroundOrigin: 'border-box',
    backgroundClip: 'border-box',
});

export const searchInner = style({
    width: '100%',
    padding: '12px 16px',

    display: 'flex',
    columnGap: '8px',

    borderRadius: '5px',
    backgroundColor: COLOR.MonoWhite,
});

export const searchInput = style({
    width: '100%',
    '::placeholder': {
        color: COLOR.Gray400,
    },
});
