import { style } from '@vanilla-extract/css';

export const layoutStyle = style({
    backgroundColor: 'transparent',
    padding: '0 0 50px 0',
    width: '338px',
});

export const windowStyle = style({
    alignItems: 'center',
    backgroundColor: 'white',
    border: '1px solid #6B7280',
    borderRadius: '14px',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '18px 32px 16px 32px',
    width: '100%',
});

const textStyle = style({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '230px',
});

export const nameStyle = style([
    textStyle,
    {
        color: '#111827',
        fontSize: '18px',
        fontWeight: 700,
        margin: '0 0 4px 0',
    },
]);

export const addressStyle = style([
    textStyle,
    {
        color: '#9CA3AF',
        fontSize: '15px',
        margin: '0px',
    },
]);

export const buttonStyle = style({
    backgroundColor: 'white',
    border: '1px solid #E5E7EB',
    borderRadius: '10px',
    padding: '16px',
});
