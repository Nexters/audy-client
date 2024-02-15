import { style } from '@vanilla-extract/css';

import { COLOR } from '@/styles/foundation';

export const sidePanel = style({
    width: 'max-content',
    minWidth: '505px',
    height: `calc(100vh - 64px)`,
    padding: '30px',

    display: 'flex',
    flexDirection: 'column',
    rowGap: '18px',

    flexGrow: 1,
    borderRadius: '6px',
    backgroundColor: COLOR.Gray100,
    overflowY: 'hidden',
});
