import { style } from '@vanilla-extract/css';

import { COLOR } from '@/styles/foundation';
import { sprinkles } from '@/styles/sprinkle.css';

export const wrapper = style([
    sprinkles({ zIndex: 'globalNavigation' }),
    {
        width: '100%',
        height: '64px',
        padding: '0 16px 0 30px',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',

        position: 'sticky',
        top: 0,

        backgroundColor: COLOR.MonoWhite,
        borderBottom: `1px solid ${COLOR.Gray50}`,
    },
]);

export const leftContainer = style({
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
});

export const rightContainer = style({
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
});

export const savingStatus = style([sprinkles({ typography: 'Regular15' })]);

export const settingButton = style({
    padding: '10px',
});

export const settingContent = style({
    minWidth: '164px',
    transform: 'translate(0, calc(100% + 8px))',
});

export const logoutText = style([
    sprinkles({ typography: 'Regular15' }),
    { color: COLOR.Gray950 },
]);

export const withdrawText = style([
    sprinkles({ typography: 'Regular15' }),
    { color: COLOR.Red500 },
]);
