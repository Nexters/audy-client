import { QueryClient } from '@tanstack/react-query';
import { createBrowserRouter } from 'react-router-dom';

import LoginPage from '@/pages/login';
import MainPage from '@/pages/main';

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
