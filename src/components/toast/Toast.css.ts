import { keyframes, style } from '@vanilla-extract/css';

import { COLOR } from '@/styles/foundation';
import { sprinkles } from '@/styles/sprinkle.css';

const fadeOutAnimation = keyframes({
    from: { opacity: 1 },
    to: { opacity: 0 },
});

export const layout = style([
    sprinkles({ typography: 'SemiBold14', zIndex: 'toast' }),
    {
        position: 'absolute',
        left: '50%',
        top: '73px',
        transform: 'translateX(-50%)',
        border: `1px solid ${COLOR.Gray200}`,
        backgroundColor: COLOR.MonoWhite,
        borderRadius: '8px',
        padding: '13px 20px',
        color: COLOR.Gray800,
        width: '320px',

        animation: `${fadeOutAnimation} 3s ease-in-out`,
        animationDelay: '4s',
    },
]);
