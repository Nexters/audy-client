import { style } from '@vanilla-extract/css';

import { COLOR } from '@/styles/foundation';
import { sprinkles } from '@/styles/sprinkle.css';


export const wrapper = style({
    display: 'flex',
    maxHeight: `calc(100vh - 64px)`,
    overflowY: 'hidden',
})

export const sidePanel = style({
    width: 'max-content',
    minWidth: '505px',
    height: `calc(100vh - 64px)`,
    padding: '30px',

    flexGrow: 1,
    backgroundColor: COLOR.SurfaceLevel1,
    overflowY: 'hidden',
})

export const map = style({
    width: '100%',
    height: `calc(100vh - 64px)`,
    flexGrow: 3,
    overflowY: 'hidden',
})