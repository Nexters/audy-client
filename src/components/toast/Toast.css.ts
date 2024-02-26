import { style } from '@vanilla-extract/css';

import { COLOR } from '@/styles/foundation';
import { sprinkles } from '@/styles/sprinkle.css';

export const layout = style([
    sprinkles({ typography: 'SemiBold14', zIndex: 'toast' }),
    {
        border: `1px solid ${COLOR.Gray200}`,
        backgroundColor: COLOR.MonoWhite,
        borderRadius: '8px',
        padding: '10px 20px',
        color: COLOR.Gray800,
        width: '320px',
    },
]);
