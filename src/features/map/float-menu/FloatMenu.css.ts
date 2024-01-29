import { style } from '@vanilla-extract/css';
import { sprinkles } from '@/styles/sprinkle.css';
import { recipe } from '@vanilla-extract/recipes';

import { COLOR } from '@/styles/foundation';

export const wrapper = style({
    width: 'max-content',
    padding: '8px 20px',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: '10px',

    position: 'relative',
    right: '16px',
    top: '16px',

    backgroundColor: COLOR.MonoWhite,
    borderRadius: '6px',
    border: `1px solid ${COLOR.Gray300}`,
    boxShadow: '2px 2px 4px 0px rgba(0, 0, 0, 0.12)'
});

export const pathNotice = style([
    sprinkles({typography: 'SemiBold15'}),
    {
        color: COLOR.Gray900,   
    }
]);

export const switchBox = style({
    width: '56px',
    height: '28px',
    padding: '4px',

    display: 'flex',
    justifyContent: 'flex-start',
    borderRadius: '80px',

    backgroundColor: COLOR.IndigoPrimary,
})

export const switchHandle = style({
    width: '20px',
    height: '20px',
    flexShrink: 0,

    borderRadius: '40px',
    backgroundColor: COLOR.MonoWhite,
})

export const divider = style({
    width: '1px',
    height: '12px',
    flexShrink: 0,
})

export const toggleBox = style({
    padding: '6px 8px',

    display: 'flex',
    alignItems: 'center',
    gap: '4px',

    backgroundColor: COLOR.Gray50,
    borderRadius: '4px',
})

export const toggleButton = recipe({
    base: {
        display: 'flex',
        padding: '4px 8px',
        columnGap: '10px',

        borderRadius: '4px',
    },
    variants: {
        status: {
            on: {
                backgroundColor: COLOR.MonoWhite,
                border: `1px solid ${COLOR.Gray300}`,
            },
        
            off: {
                backgroundColor: 'transparent',
            }
        }
    }
})