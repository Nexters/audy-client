import { createGlobalTheme } from '@vanilla-extract/css';

import { FONT } from './foundation';

export const theme = createGlobalTheme(':root', {
    font: FONT,
});
