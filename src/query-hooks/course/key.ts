export const COURSE_QUERY_KEY = {
    base: ['course'],
    detail: (courseId: number) => [...COURSE_QUERY_KEY.base, 'detail', courseId],
    list: () => [...COURSE_QUERY_KEY.base, 'list'],
    owned: () => [...COURSE_QUERY_KEY.base, 'owned'],
    member: () => [...COURSE_QUERY_KEY.base, 'member'],
};
