import { style } from '@vanilla-extract/css';

export const marker = style({
    position: 'relative',
});

export const numberWrapper = style({
    position: 'absolute',
    top: 'calc(50% - 3px)',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    fontFamily: 'Pretendard',
    fontSize: '20px',
    fontWeight: '800',
});
