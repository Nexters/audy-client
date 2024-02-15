import { style } from '@vanilla-extract/css';

import { COLOR } from '@/styles/foundation';
import { sprinkles } from '@/styles/sprinkle.css';

export const layout = style({
    display: 'flex',
    alignItems: 'flex-start',
    gap: '24px',
});

export const courseTypeTab = style([
    sprinkles({ typography: 'SemiBold20' }),
    {
        color: COLOR.Gray400,
        padding: '0 0 8px 0',
    },
]);

export const selectedCourseTypeTab = style([
    courseTypeTab,
    sprinkles({ typography: 'ExtraBold20' }),
    {
        color: COLOR.Gray900,

        borderBottom: `2px solid ${COLOR.Gray900}`,
    },
]);
