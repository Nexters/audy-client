import { style } from '@vanilla-extract/css';

import { COLOR } from '@/styles/foundation';
import { sprinkles } from '@/styles/sprinkle.css';

export const wrapper = style({
    display: 'flex',
    maxHeight: `calc(100vh - 64px)`,
    overflowY: 'hidden',
});

export const map = style({
    width: '100%',
    height: `calc(100vh - 64px)`,
    flexGrow: 3,
    overflowY: 'hidden',

    position: 'relative',
});

export const header = style({
    display: 'flex',
    columnGap: '8px',
    alignItems: 'center',
    marginBottom: '8px',
});

export const courseName = style([
    sprinkles({ typography: 'Black20' }),
    {
        color: COLOR.Gray800,
        flexGrow: 1,
    },
]);

export const courseNameInput = style([
    sprinkles({ typography: 'Black20' }),
    {
        color: COLOR.Gray800,
        backgroundColor: COLOR.MonoWhite,
        border: `1px solid ${COLOR.Gray300}`,
        borderRadius: '4px',
        padding: '4px 15px',
        flexGrow: 1,
    },
]);

export const courseNameSaveButton = style([
    sprinkles({ typography: 'SemiBold15' }),
    {
        color: COLOR.Gray900,
        padding: '0px',
        margin: '0 0 0 12px',
    },
]);

export const backArrowIcon = style({
    color: COLOR.Gray900,
});

export const courseNameEditButton = style({
    color: COLOR.Gray400,
    padding: '4px',
    borderRadius: '10px',

    ':hover': {
        color: COLOR.Gray800,
        backgroundColor: COLOR.Gray200,
    },
});

export const pathViewWrapper = style({
    height: '100%',
});

export const hidden = style({
    display: 'none',
});
