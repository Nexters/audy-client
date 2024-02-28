import { style } from '@vanilla-extract/css';

import { COLOR } from '@/styles/foundation';
import { sprinkles } from '@/styles/sprinkle.css';

export const layout = style({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflowY: 'auto',
    padding: '12px 0',
    backgroundColor: COLOR.MonoWhite,
});

export const observer = style({
    width: '100%',
    height: '4px',
});

export const emptyNotice = style([
    sprinkles({ typography: 'Medium14' }),
    {
        margin: 'auto',
        color: COLOR.Gray400,
    },
]);
