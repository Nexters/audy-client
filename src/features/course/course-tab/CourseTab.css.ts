import { style } from '@vanilla-extract/css';

import { COLOR } from '@/styles/foundation';
import { sprinkles } from '@/styles/sprinkle.css';

export const layout = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '17px 24px',
    width: '100%',
    backgroundColor: COLOR.MonoWhite,
    borderRadius: '42px',
    cursor: 'pointer',

    ':hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.03)',
    },
});

export const courseNameContainer = style({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    margin: '0 0 4px 0',
});

export const courseName = style([
    sprinkles({ typography: 'ExtraBold18' }),
    { color: COLOR.Gray950 },
]);

export const courseDetailsContainer = style({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
});

export const courseDetailWrapper = style({
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
});

export const divider = style({
    width: '1px',
    height: '12px',
    backgroundColor: COLOR.Gray400,
});

export const courseDetail = style([
    sprinkles({ typography: 'Regular15' }),
    { color: COLOR.Gray400 },
]);
