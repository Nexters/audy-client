export const FONT = {
    pretendard: 'Pretendard',
};

const FONT_WEIGHT = {
    regular: 300,
    medium: 400,
    semiBold: 500,
    bold: 600,
    extraBold: 700,
    black: 800,
};

const LINE_HEIGHT = '140%';

const FONT_SIZE = [...Array(21).keys()].map((num) => num + 10);

export const TYPOGRAPHY = FONT_SIZE.reduce(
    (previous, size) => ({
        ...previous,
        [`Regular${size}`]: {
            fontSize: `${size}px`,
            fontWeight: FONT_WEIGHT.regular,
            lineHeight: LINE_HEIGHT,
            letterSpacing: '0.03px',
        },
        [`Medium${size}`]: {
            fontSize: `${size}px`,
            fontWeight: FONT_WEIGHT.medium,
            lineHeight: LINE_HEIGHT,
            letterSpacing: '0.03px',
        },
        [`SemiBold${size}`]: {
            fontSize: `${size}px`,
            fontWeight: FONT_WEIGHT.semiBold,
            lineHeight: LINE_HEIGHT,
            letterSpacing: '0.03px',
        },
        [`Bold${size}`]: {
            fontSize: `${size}px`,
            fontWeight: FONT_WEIGHT.bold,
            lineHeight: LINE_HEIGHT,
            letterSpacing: '0.03px',
        },
        [`ExtraBold${size}`]: {
            fontSize: `${size}px`,
            fontWeight: FONT_WEIGHT.extraBold,
            lineHeight: LINE_HEIGHT,
            letterSpacing: '0.03px',
        },
        [`Black${size}`]: {
            fontSize: `${size}px`,
            fontWeight: FONT_WEIGHT.black,
            lineHeight: LINE_HEIGHT,
            letterSpacing: '0.03px',
        },
    }),
    {},
);
