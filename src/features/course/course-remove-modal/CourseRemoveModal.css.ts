import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { COLOR } from '@/styles/foundation';
import { sprinkles } from '@/styles/sprinkle.css';

export const informationText = style([
    sprinkles({ typography: 'Medium18' }),
    {
        color: COLOR.Gray600,
    },
]);

export const footerButton = recipe({
    base: [
        sprinkles({ typography: 'Bold17' }),
        {
            height: '56px',
            flex: 1,
            textAlign: 'center',
            borderRadius: '10px',
        },
    ],
    variants: {
        action: {
            cancel: {
                color: COLOR.Gray500,
                backgroundColor: COLOR.Gray100,
            },
            remove: {
                color: COLOR.MonoWhite,
                backgroundColor: COLOR.Red500,
            },
        },
    },
});
