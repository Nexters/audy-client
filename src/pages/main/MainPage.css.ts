import { style } from '@vanilla-extract/css';

import { COLOR } from '@/styles/foundation';
import { sprinkles } from '@/styles/sprinkle.css';

export const wrapper = style({
    display: 'flex',
    maxHeight: `calc(100vh - 64px)`,
    overflowY: 'hidden',
});

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
    backgroundColor: COLOR.SurfaceLevel1,
    overflowY: 'hidden',
});

export const header = style({
    display: 'flex',
    columnGap: '8px',
    alignItems: 'center',
    marginBottom: '8px',
});

export const courseName = style([
    sprinkles({ typography: 'Black20' }),
    {
        flexGrow: 1,
    },
]);

export const backArrowIcon = style({
    color: COLOR.Gray900,
});

export const modifyIcon = style({
    color: COLOR.Gray400,
});

export const searchBox = style({
    width: '100%',

    borderRadius: '6px',
    border: '1px solid transparent',

    backgroundImage: COLOR.GradientLinear,
    backgroundOrigin: 'border-box',
    backgroundClip: 'border-box'
})

export const searchInner = style({
    width: '100%',
    padding: '12px 16px',
    
    display: 'flex',
    columnGap: '8px',

    borderRadius: '5px',
    backgroundColor: COLOR.MonoWhite,
})

export const searchInput = style({
    '::placeholder' : {
        color: COLOR.Gray400,
    }
})

export const map = style({
    width: '100%',
    height: `calc(100vh - 64px)`,
    flexGrow: 3,
    overflowY: 'hidden',

    position: 'relative',
});
