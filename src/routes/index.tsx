import { QueryClient } from '@tanstack/react-query';
import { createBrowserRouter } from 'react-router-dom';

import CoursePage from '@/pages/course';
import LoginPage from '@/pages/login';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

export const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <div>에러</div>,
        element: <CoursePage />,
    },
    {
        path: 'login',
        element: <LoginPage />,
    },
]);
