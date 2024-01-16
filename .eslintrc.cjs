module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'prettier',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    rules: {
        // Basic Rules
        'no-tabs': 'off',
        'import/no-anonymous-default-export': 'off',
        // NOTE : 사용하지 않은 변수 중에서 _ 는 생략 가능하도록 설정
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '_' }],
        // React Rules
        'react/jsx-props-no-spreading': 'off',
        'react/jsx-no-constructed-context-values': 'off',
        'react/destructuring-assignment': 'off',
        // React-Hooks Rules
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
    },
};
