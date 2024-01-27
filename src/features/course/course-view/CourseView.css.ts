import { style } from '@vanilla-extract/css';

import { COLOR } from '@/styles/foundation';

export const wrapper = style({
    height: '100%',
    padding: '12px 8px',

    display: 'flex',
    flexDirection: 'column',

    backgroundColor: COLOR.MonoWhite,
    overflowY: 'scroll',

    "::-webkit-scrollbar": {
        width: '8px',
    },

    "::-webkit-scrollbar-thumb": {
        width: '3px',

        backgroundClip: 'padding-box',
        borderLeft: `3px solid transparent`,
        borderRight: `2px solid transparent`,
        borderTop: `20px solid transparent`,
        borderBottom: `20px solid transparent`,

        borderRadius: '4px',
        backgroundColor: COLOR.Gray300,
    },
});