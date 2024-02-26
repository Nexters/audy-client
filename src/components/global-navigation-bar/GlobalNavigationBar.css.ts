import { style } from '@vanilla-extract/css';

import { COLOR } from '@/styles/foundation';
import { sprinkles } from '@/styles/sprinkle.css';

export const wrapper = style([
    sprinkles({ zIndex: 'globalNavigation' }),
    {
        width: '100%',
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
        margin: '0 auto 0 4px',
    },
]);

export const settingIcon = style({
    color: COLOR.Gray500,
});

export const settingContent = style({
    minWidth: '164px',
    transform: 'translate(0, calc(100% + 8px))',
})

export const logoutText= style([
    sprinkles({ typography: 'Regular15' }),
    {
        color: COLOR.Gray950,
    },
]);

export const withdrawText = style([
    sprinkles({ typography: 'Regular15' }),
    {
        color: COLOR.Red500,
    },
])