import { style } from '@vanilla-extract/css';

import { COLOR } from '@/styles/foundation';

export const layout = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLOR.MonoWhite,
    padding: '18px 24px 16px 32px',
    borderRadius: '6px',
});

const text = style({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '210px',
});

export const name = style([
    text,
    {
        color: '#111827',
        fontSize: '18px',
        fontWeight: 700,
    },
]);

export const addressContainer = style({
    display: 'flex',
    alignItems: 'center',
    margin: '4px 0 0 0',
});

export const address = style([
    text,
    {
        color: '#9CA3AF',
        fontSize: '15px',
        margin: '0 0 0 4px',
    },
]);

export const pinButton = style({
    backgroundColor: 'white',
    border: '1px solid #E5E7EB',
    borderRadius: '10px',
    padding: '6px',
    margin: '0 0 0 12px',

    ':hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.03);',
    },
});
