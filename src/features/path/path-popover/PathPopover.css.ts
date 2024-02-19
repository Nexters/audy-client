import { style } from '@vanilla-extract/css';

import { COLOR } from '@/styles/foundation';
import { sprinkles } from '@/styles/sprinkle.css';

export const layout = style({
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    border: `1px solid ${COLOR.Gray200}`,
    borderRadius: '15px',
    backgroundColor: COLOR.MonoWhite,
    padding: '8px 0',
    width: '164px',
    gap: '4px',
});

export const popoverTextContainer = style({
    display: 'flex',
    gap: '12px',
    padding: '9px 16px',
    transition: 'background-color 0.2s ease-in-out',

    ':hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.03)',
    },
});

export const popoverText = style([
    sprinkles({ typography: 'Medium15' }),

    {
        color: COLOR.Gray950,
    },
]);
