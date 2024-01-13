module.exports = {
    singleQuote: true,
    trailingComma: 'all',
    tabWidth: 4,
    semi: true,
    useTabs: false,
    plugins: ['@trivago/prettier-plugin-sort-imports'],
    importOrder: [
        "^react?$",
        "<THIRD_PARTY_MODULES>",
        "^@\/(?=.*)(?!$)",
        "^\/(?=.*)(?!$)",
        "^..\/(?=.*)(?!$)",
        "^.\/(?=.*)(?!$)|^.\/?$"
    ],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
};
