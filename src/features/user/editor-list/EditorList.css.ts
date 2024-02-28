import { style } from '@vanilla-extract/css';

import { COLOR } from '@/styles/foundation';

export const layout = style({
    display: 'flex',
    gap: '4px',
});

export const editorInviteButton = style({
    backgroundColor: COLOR.PinkPrimary,
    borderRadius: '50%',
    padding: '9px',
});
