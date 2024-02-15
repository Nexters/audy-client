import { QueryClient } from '@tanstack/react-query';
import { createBrowserRouter } from 'react-router-dom';

import MainPage from '@/pages/course';
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
        element: <MainPage />,
    },
    {
        path: 'login',
        element: <LoginPage />,
    },
]);
