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

    width: 'max-content',
    padding: '8px 0',

    position: 'absolute',
    zIndex: Z_INDEX.popOver,
    bottom: '4px',
    right: '0',
    
    backgroundColor: COLOR.MonoWhite,
    border: `1px solid ${COLOR.Gray200}`,
    borderRadius: '15px',
    boxShadow: `0px 10px 20px 0px rgba(0, 0, 0, 0.12)`,
    transform: 'translate(0, 100%)'
});

export const item = style({
    display: 'flex',
    gap: '12px',

    width: '164px',
    padding: '8px 16px',

    ':hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.03)',
    },
});
