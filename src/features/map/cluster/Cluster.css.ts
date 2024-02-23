import { style } from '@vanilla-extract/css';

import { sprinkles } from '@/styles/sprinkle.css';

export const layout = style([
    sprinkles({ typography: 'SemiBold20' }),
    {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: `rgba(0, 0, 0, 0.2)`,
        borderRadius: '50%',
        width: '50px',
        height: '50px',
    },
]);
