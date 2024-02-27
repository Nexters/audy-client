import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { COLOR } from '@/styles/foundation';

export const layout = style({
    position: 'relative',
    width: 'max-content',
});

export const profileImageWrapper = style({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    overflow: 'hidden',
    width: '38px',
    height: '38px',
});

export const profileImage = style({
    position: 'absolute',
    width: '38px',
    height: '38px',
    objectFit: 'cover',
});

export const profileImageInnerBorder = style({
    position: 'absolute',
    borderRadius: '50%',
    width: '35px',
    height: '35px',
    border: `1.5px solid rgba(255, 255, 255, 0.9)`,
});

export const profileImageOuterBorder = recipe({
    base: {
        position: 'absolute',
        borderRadius: '50%',
        width: '38px',
        height: '38px',
    },
    variants: {
        isOnline: {
            true: {
                border: `2px solid ${COLOR.PinkPrimary}`,
            },
            false: {
                border: `2px solid rgba(0, 0, 0, 0.1)`,
            },
        },
    },
});

export const tooltipWrapper = style({
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    top: 'calc(100% + 4px)',
    left: '50%',
});
