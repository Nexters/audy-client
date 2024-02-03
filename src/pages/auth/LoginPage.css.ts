import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { COLOR } from '@/styles/foundation';
import { sprinkles } from '@/styles/sprinkle.css';

export const wrapper = style({
    width: '100%',
    height: '100vh',

    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',

    backgroundColor: COLOR.Gray50,
});

export const loginContainer = style({
    padding: '60px 40px',

    display: 'flex',
    flexDirection: 'column',
    rowGap: '80px',
});

export const introduceBox = style({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    rowGap: '12px',
});

export const introduceText = style([
    sprinkles({ typography: 'ExtraBold28' }),
    { color: COLOR.Gray950 },
]);

export const loginNoticeText = style([
    sprinkles({ typography: 'SemiBold16' }),
    { color: COLOR.Gray400 },
]);

export const audyLogo = style({
    marginBottom: '20px',
});

export const buttonBox = style({
    width: '100%',

    display: 'flex',
    flexDirection: 'column',
    rowGap: '16px',
});

export const loginButton = recipe({
    base: [
        sprinkles({ typography: 'ExtraBold16' }),
        {
            width: '100%',

            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            columnGap: '12px',

            borderRadius: '12px',
        },
    ],
    variants: {
        socialType: {
            kakao: {
                color: '#1A1B1F',
                backgroundColor: '#FEE500',
            },
            apple: {
                color: COLOR.MonoWhite,
                backgroundColor: COLOR.MonoBlack,
            },
        },
    },
});
