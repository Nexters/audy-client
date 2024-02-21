import { keyframes, style } from '@vanilla-extract/css';

import { COLOR } from '@/styles/foundation';
import { sprinkles } from '@/styles/sprinkle.css';

const fadeOutAnimation = keyframes({
    from: { opacity: 1 },
    to: { opacity: 0 },
});

export const layout = style([
    sprinkles({ typography: 'SemiBold16' }),
    {
        position: 'absolute',
        border: `1px solid ${COLOR.Gray200}`,
        backgroundColor: COLOR.MonoWhite,
        borderRadius: '18px',
        padding: '20px',
        color: COLOR.Gray800,
        zIndex: 1000,

        animation: `${fadeOutAnimation} 3s ease-in-out`,
        animationDelay: '3s',
    },
]);
