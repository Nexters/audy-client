import { style } from '@vanilla-extract/css';

import { COLOR } from '@/styles/foundation';
import { sprinkles } from '@/styles/sprinkle.css';

export const layout = style({
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

export const addNewCourseButton = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    backgroundColor: COLOR.MonoWhite,
    padding: '14px',
    borderRadius: '6px',
    border: `1px solid ${COLOR.Gray200}`,
    transition: 'background-color 0.2s',

    ':hover': {
        backgroundColor: COLOR.Gray200,
    },
});

export const addNewCourseButtonText = style([
    sprinkles({ typography: 'Bold15' }),
    { color: COLOR.Gray900 },
]);
