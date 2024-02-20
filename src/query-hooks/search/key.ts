export const SEARCH_QUERY_KEY = {
    base: ['search'],
    pois: (keyword: string) => [...SEARCH_QUERY_KEY.base, 'pois', keyword],
};
