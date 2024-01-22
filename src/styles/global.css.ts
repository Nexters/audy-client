import { globalStyle } from '@vanilla-extract/css';

import { theme } from '@/styles/theme.css';

/**
 * NOTE : 일반적으로 통용되는 global css 스타일 + 공통으로 적용되면 좋은 스타일을 적용
 * @see https://velog.io/@teo/2022-CSS-Reset-%EB%8B%A4%EC%8B%9C-%EC%8D%A8%EB%B3%B4%EA%B8%B0
 */
globalStyle(
    'html, body, div, span, h1, h2, h3, h4, h5, h6, p, pre, a, img, strong, article, footer, header, main, nav, section',
    {
        margin: 0,
        padding: 0,
        border: 0,
        verticalAlign: 'baseline',
        fontFamily: theme.font.pretendard,
    },
);

globalStyle('h1, h2, h3, h4, h5, h6, p', {
    wordBreak: 'keep-all',
    whiteSpace: 'pre-wrap',
});

globalStyle('img, picture, video, canvas, svg', {
    display: 'block',
    maxWidth: '100%',
})

globalStyle('button, select, input, textarea', {
    border: 0,
    outline: 0,
    backgroundColor: 'transparent',
    fontFamily: theme.font.pretendard,
});

globalStyle('a', {
    textDecoration: 'none',
    color: 'inherit',
});

globalStyle('a, button', {
    cursor: 'pointer',
});

globalStyle('ol, ul', {
    margin: 0,
    padding: 0,
    listStyle: 'none',
});
