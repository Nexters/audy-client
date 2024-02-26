import { style } from '@vanilla-extract/css';

export const layout = style({
    position: 'absolute',
    left: '50%',
    top: '73px',
    transform: 'translateX(-50%)',
    gap: '4px',
    display: 'flex',
    flexDirection: 'column',
});
