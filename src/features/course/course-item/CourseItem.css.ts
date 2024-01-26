import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { COLOR } from '@/styles/foundation';

export const wrapper = recipe({
    base: {
        maxWidth: '429px',
        padding: '16px 18px',
    
        display: 'flex',
        alignItems: 'center',
        columnGap: '12px',
    
        overflowX: 'hidden',
    },

    variants: {
        status: {
            selected: {
                borderRadius: '100px',
                backgroundColor: `${COLOR.MonoBlack}08`,
            },
            none: {}
        }
    }
});

export const listIcon = style({
    margin: '10px',
    cursor: 'pointer',
    flexShrink: 0,
    flexGrow: 0,
});
