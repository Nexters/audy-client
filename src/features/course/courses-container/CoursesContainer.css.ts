import { style } from '@vanilla-extract/css';

import { COLOR } from '@/styles/foundation';

export const layout = style({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflowY: 'auto',
    padding: '16px 0',
    borderRadius: '6px',
    backgroundColor: COLOR.MonoWhite,
});

export const lastChildren = style({
    width: '100%',
    height: '8px',
});
