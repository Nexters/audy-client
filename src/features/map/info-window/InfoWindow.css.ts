import { style } from '@vanilla-extract/css';

export const layout = style({
    backgroundColor: 'transparent',
    width: '338px',
});

export const layoutMargin = style({
    margin: '0 0 50px 0',
});

export const window = style({
    width: '500px',
    position: 'relative',
});

export const contentsContainer = style({
    position: 'absolute',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    top: '24px',
    left: '32px',
});

const text = style({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '230px',
});

export const name = style([
    text,
    {
        color: '#111827',
        fontSize: '18px',
        fontWeight: 700,
        margin: '0 0 4px 0',
    },
]);

export const address = style([
    text,
    {
        color: '#9CA3AF',
        fontSize: '15px',
        margin: '0px',
    },
]);

export const pinButton = style({
    backgroundColor: 'white',
    border: '1px solid #E5E7EB',
    borderRadius: '10px',
    padding: '16px',
    margin: '0 0 0 12px',
});
