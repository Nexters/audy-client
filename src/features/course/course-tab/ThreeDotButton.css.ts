import { COLOR } from '@/styles/foundation';
import { sprinkles } from '@/styles/sprinkle.css';
import { style } from '@vanilla-extract/css';

export const threeDotButton = style({
    padding: '10px',
});

export const text = style([
    sprinkles({ typography: 'Medium15' }),

    {
        color: COLOR.Gray950,
    },
]);
