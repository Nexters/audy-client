import { style } from '@vanilla-extract/css';

import { COLOR } from '@/styles/foundation';

export const layout = style({
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    padding: '12px 8px',
    backgroundColor: COLOR.MonoWhite,
});
