import { QueryClient } from '@tanstack/react-query';
import { createBrowserRouter } from 'react-router-dom';

import CoursePage from '@/pages/course';
import LoginPage from '@/pages/login';
import MainPage from '@/pages/main';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 0,
        },
    },
});

export const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <div>에러</div>,
        element: <MainPage />,
    },
    {
        path: 'login',
        element: <LoginPage />,
    },
    {
        // FIXME: 임시 라우팅
        path: '/course',
        element: <CoursePage />,
    },
]);
