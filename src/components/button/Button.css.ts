import { recipe } from '@vanilla-extract/recipes';

export const ButtonStyle = recipe({
    base: {
        width: '100%',
    },
    variants: {
        color: {
            neutral: { background: 'whitesmoke' },
            brand: { background: 'blueviolet' },
        },
        size: {
            small: { padding: 12 },
            medium: { padding: 16 },
            large: { padding: 24 },
        },
        rounded: {
            true: { borderRadius: 999 },
        },
    },
    defaultVariants: {
        color: 'neutral',
        size: 'medium',
    },
});
