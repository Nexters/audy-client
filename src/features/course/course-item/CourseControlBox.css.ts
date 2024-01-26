import { style } from '@vanilla-extract/css';
import { COLOR } from '@/styles/foundation';
import { sprinkles } from '@/styles/sprinkle.css';

export const wrapper = style({
    display: 'flex',
    justifyContent: 'space-between',
    flexGrow: 1,
    flexShrink: 1,
});

export const courseBox = style({
    maxWidth: '220px',

    display: 'flex',
    flexDirection: 'column',
    rowGap: '4px',

    overflowX: 'hidden',
    flexShrink: 1,
});

export const courseName = style([
    sprinkles({ typography: 'ExtraBold18' }),
    {
        minWidth: 0,
        color: COLOR.LablesPrimary,
    },
]);

export const addressBox = style({
    display: 'flex',
    columnGap: '4px',
    alignItems: 'center',
    color: COLOR.LablesTertiary,
});

export const addressIcon = style({
    flexShrink: 0,
});

export const address = style([
    sprinkles({ typography: 'Regular15' }),
    {
        color: COLOR.LablesTertiary,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        wordBreak: 'break-all',
        flexShrink: 1,
    },
]);

export const controlBox = style({
    display: 'flex',
    columnGap: '12px',
    alignItems: 'center',

    flexShrink: 0,
});

export const controlIcon = style({
    padding: '6px',

    color: COLOR.Gray400,
    border: `1px solid ${COLOR.Gray300}`,
    borderRadius: '10px',
    cursor: 'pointer',

    ':hover': {
        backgroundColor: COLOR.Gray300,
        color: COLOR.Gray600,
        pointerEvents: 'all',
    },
});
