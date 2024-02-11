import { createGlobalTheme } from '@vanilla-extract/css';

import { FONT, COLOR, MEDIA_QUERY } from './foundation';

export const theme = createGlobalTheme(':root', {
    font: FONT,
    color: COLOR,
    mediaQuery: MEDIA_QUERY
});
