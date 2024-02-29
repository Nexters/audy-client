import { style } from '@vanilla-extract/css';

import { COLOR } from '@/styles/foundation';
import { sprinkles } from '@/styles/sprinkle.css';

export const infoText = style([
    sprinkles({ typography: 'Medium18' }),
    {
        color: COLOR.Gray600,
    },
]);

export const footerButton = style([
    sprinkles({ typography: 'Bold17' }),
    {
        height: '56px',
        flex: 1,

        textAlign: 'center',
        borderRadius: '10px',
        color: COLOR.MonoWhite,
        backgroundColor: COLOR.Gray800,
    },
]);
