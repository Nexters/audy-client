import { style } from '@vanilla-extract/css';

import { COLOR } from '@/styles/foundation';

export const layout = style({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflowY: 'auto',
    padding: '12px 8px',
    backgroundColor: COLOR.MonoWhite,
});

export const observer = style({
    width: '100%',
    height: '4px',
})