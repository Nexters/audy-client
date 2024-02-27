import { keyframes, style } from '@vanilla-extract/css';

import { COLOR } from '@/styles/foundation';
import { sprinkles } from '@/styles/sprinkle.css';

const fadeOutAnimation = keyframes({
    from: { opacity: 1 },
    to: { opacity: 0 },
});

export const layout = style([
    sprinkles({ typography: 'SemiBold14', zIndex: 'snackBar' }),
    {
        position: 'absolute',
        left: '50%',
        top: '73px',
        transform: 'translateX(-50%)',
        border: `1px solid ${COLOR.Gray200}`,
        backgroundColor: COLOR.MonoWhite,
        borderRadius: '8px',
        padding: '0 8px 0 20px',
        color: COLOR.Gray800,
        width: '320px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',

        animation: `${fadeOutAnimation} 3s ease-in-out`,
        animationDelay: '8s',
    },
]);

export const buttonsContainer = style({
    display: 'flex',
    alignItems: 'center',
});

export const undoButton = style([
    sprinkles({ typography: 'SemiBold14' }),
    {
        padding: '5px 8px',
        color: COLOR.Gray500,
        backgroundColor: 'rgba(0, 0, 0, 0.03)',
        borderRadius: '4px',
        transition: 'background-color 0.2s',

        ':hover': {
            backgroundColor: COLOR.Blue500,
            color: COLOR.MonoWhite,
        },
    },
]);

export const closeButton = style({
    color: COLOR.Gray400,
    padding: '10px',
});
