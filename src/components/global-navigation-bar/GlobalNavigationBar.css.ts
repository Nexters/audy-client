import { style } from '@vanilla-extract/css';

import { COLOR } from '@/styles/foundation';
import { sprinkles } from '@/styles/sprinkle.css';

export const wrapper = style([
    sprinkles({ zIndex: 'globalNavigation' }),
    {
        width: '100vw',
        padding: '17px 30px',

        display: 'flex',
        alignItems: 'center',

        position: 'sticky',
        top: 0,

        backgroundColor: COLOR.MonoWhite,
        borderBottom: `1px solid ${COLOR.Gray50}`,
    },
]);

export const savingStatus = style([
    sprinkles({ typography: 'Regular15' }),
    {
        margin: '0 auto 4px',
    },
]);

export const settingIcon = style({
    color: COLOR.Gray500,
});
