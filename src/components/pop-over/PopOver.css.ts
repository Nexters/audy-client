import { style } from '@vanilla-extract/css';

import { COLOR, Z_INDEX } from '@/styles/foundation';

export const wrapper = style({
    position: 'relative',
});

export const trigger = style({
    width: 'fit-content',
    height: 'fit-content',
});

export const content = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',

    width: 'fit-content',
    padding: '8px 0',

    position: 'absolute',
    zIndex: Z_INDEX.popOver,
    top: '4px',
    right: '0',
    
    backgroundColor: COLOR.MonoWhite,
    borderRadius: '15px',
});

export const item = style({
    display: 'flex',
    gap: '12px',

    padding: '8px 16px',

    ':hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.03)',
    },
});
