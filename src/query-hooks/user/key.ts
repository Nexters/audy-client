export const USER_QUERY_KEY = {
    base: ['user'],
    info: (userId?: string) =>
        userId
            ? [...USER_QUERY_KEY.base, 'info', userId]
            : [...USER_QUERY_KEY.base, 'info'],
};
