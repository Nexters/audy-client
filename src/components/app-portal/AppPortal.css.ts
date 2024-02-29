import { style } from '@vanilla-extract/css';

import { sprinkles } from '@/styles/sprinkle.css';

export const Wrapper = style([
    sprinkles({ zIndex: 'appPortal' }),
    {
        position: 'absolute',
        left: 0,
        top: 0,

        width: '100%',
    },
]);
