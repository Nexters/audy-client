import { style } from '@vanilla-extract/css';

import { COLOR } from '@/styles/foundation';

export const wrapper = style({
    padding: '12px 8px',
    backgroundColor: COLOR.MonoWhite,
    overflowY: 'scroll',

    "::-webkit-scrollbar": {
        width: '8px',
    },

    "::-webkit-scrollbar-thumb": {
        width: '3px',
        borderRadius: '4px',
        backgroundColor: COLOR.Gray300,
    },
});