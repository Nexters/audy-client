import { keyframes, style } from '@vanilla-extract/css';

import { COLOR } from '@/styles/foundation';
import { sprinkles } from '@/styles/sprinkle.css';

const fadeOutAnimation = keyframes({
    from: { opacity: 1 },
    to: { opacity: 0 },
});

export const layout = style([
    sprinkles({ typography: 'Bold14', zIndex: 'snackBar' }),
    {
        position: 'absolute',
        border: `1px solid ${COLOR.Gray200}`,
        backgroundColor: COLOR.MonoWhite,
        borderRadius: '8px',
        padding: '14px 20px',
        color: COLOR.Gray800,

        animation: `${fadeOutAnimation} 3s ease-in-out`,
        animationDelay: '5s',
    },
]);
