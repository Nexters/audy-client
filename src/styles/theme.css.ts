import { createGlobalTheme } from '@vanilla-extract/css';

import { FONT, COLOR } from './foundation';

export const theme = createGlobalTheme(':root', {
    font: FONT,
    color: COLOR,
});
