import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { COLOR, MEDIA_QUERY } from '@/styles/foundation';
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
    height: 'max-content',
    padding: '60px 40px 40px 40px',
    margin: 'auto',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    rowGap: '80px',

    backgroundColor: COLOR.MonoWhite,
    borderRadius: '20px',

    '@media': {
        [MEDIA_QUERY.mobile]: {
            width: 'calc(100% - 40px)',
            padding: '40px 20px 20px 20px',
        },
    },
});

export const introduceBox = style({
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    rowGap: '12px',

    textAlign: 'center',
});

export const introduceText = style([
    sprinkles({ typography: 'ExtraBold28' }),
    { color: COLOR.Gray950 },
]);

export const sloganText = style([
    sprinkles({ typography: 'Medium14' }),
    { color: COLOR.Gray700 },
]);

export const audyLogo = style({
    margin: '0 auto 20px auto',
});

export const loginNoticeText = style([
    sprinkles({ typography: 'SemiBold16' }),
    { color: COLOR.Gray400 },
]);

export const buttonBox = style({
    width: '100%',

    display: 'flex',
    flexDirection: 'column',
    rowGap: '16px',

    textAlign: 'center',
});

export const loginButton = recipe({
    base: [
        sprinkles({ typography: 'ExtraBold16' }),
        {
            width: '100%',
            padding: '12px 0',

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
                backgroundColor: COLOR.Gray950,
            },
        },
    },
});
