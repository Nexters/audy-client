export const makeQueryString = (
    config: Record<string, string | number | boolean>,
) => {
    return Object.entries(config)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');
};
