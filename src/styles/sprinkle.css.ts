import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';

import { TYPOGRAPHY, Z_INDEX } from '@/styles/foundation';

const typoProperties = defineProperties({
    properties: {
        typography: TYPOGRAPHY,
    },
});

const zIndexProperties = defineProperties({
    properties: {
        zIndex: Z_INDEX,
    },
});

export const sprinkles = createSprinkles(typoProperties, zIndexProperties);
