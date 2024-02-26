import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { COLOR } from '@/styles/foundation';
import { sprinkles } from '@/styles/sprinkle.css';

export const searchBox = style({
    width: '100%',

    borderRadius: '6px',
    border: '1px solid transparent',

    backgroundImage: COLOR.GradientLinear,
    backgroundOrigin: 'border-box',
    backgroundClip: 'border-box',
});

export const searchInnerBox = style({
    width: '100%',
    padding: '8px 16px',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: '8px',

    borderRadius: '5px',
    backgroundColor: COLOR.MonoWhite,
});

export const searchInput = recipe({
    base: [
        sprinkles({ typography: 'SemiBold16' }),
        {
            width: '100%',
            padding: '4px 15px',
            flex: '1',

            '::placeholder': {
                color: COLOR.Gray400,
            },
        },
    ],
    variants: {
        isSearchMode: {
            true: {
                backgroundColor: COLOR.Gray50,
                borderRadius: '8px',
            },
            false: {
                backgroundColor: COLOR.MonoWhite,
            },
        },
    },
});

export const cancelContainer = style({
    display: 'flex',
});

export const initializeButton = style({
    padding: '0px',
});

export const divider = style({
    borderRight: `1px solid ${COLOR.Gray300}`,
    height: '16px',
    margin: '0 16px 0 12px',
});

export const cancelButton = style({
    whiteSpace: 'nowrap',
    padding: '0px',
});
