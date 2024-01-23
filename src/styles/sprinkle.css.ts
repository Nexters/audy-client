import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';

import { TYPOGRAPHY } from '@/styles/foundation';

const typoProperties = defineProperties({
    properties: {
        typography: TYPOGRAPHY,
    },
});

export const sprinkles = createSprinkles(typoProperties);