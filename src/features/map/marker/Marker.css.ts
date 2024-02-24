import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { COLOR } from '@/styles/foundation';

export const marker = style({
    position: 'relative',
});

export const numberWrapper = recipe({
    base: {
        position: 'absolute',
        top: 'calc(50% - 3px)',
        left: '50%',
        transform: 'translate(-50%, -50%)',

        fontFamily: 'Pretendard',
        fontSize: '20px',
        fontWeight: '800',
    },
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
