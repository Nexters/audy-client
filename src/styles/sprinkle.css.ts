import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';

import { TYPOGRAPHY, ZIndex } from '@/styles/foundation';

const typoProperties = defineProperties({
    properties: {
        typography: TYPOGRAPHY,
    },
});

const zIndexProperties = defineProperties({
    properties: {
        zIndex: ZIndex,
    },
});

export const sprinkles = createSprinkles(typoProperties, zIndexProperties);
