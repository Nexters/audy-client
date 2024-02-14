export const QUERY_KEY = {
    base: ['user'],
    info: (userId?: string) =>
        userId
            ? [...QUERY_KEY.base, 'info', userId]
            : [...QUERY_KEY.base, 'info'],
};
