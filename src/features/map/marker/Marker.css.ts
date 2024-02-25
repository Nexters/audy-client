import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { COLOR } from '@/styles/foundation';
import { sprinkles } from '@/styles/sprinkle.css';

export const marker = style({
    position: 'relative',
});

export const numberWrapper = recipe({
    base: [
        sprinkles({ typography: 'SemiBold20' }),
        {
            position: 'absolute',
            top: 'calc(50% - 3px)',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        },
    ],
    variants: {
        isHidden: {
            true: {
                color: COLOR.Gray400,
            },
            false: {
                color: COLOR.MonoWhite,
            },
        },
    },
});
