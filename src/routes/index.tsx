import { QueryClient } from '@tanstack/react-query';
import { createBrowserRouter } from 'react-router-dom';

import LoginPage from '@/pages/login';
import MainPage from '@/pages/main';
import { MainPageLoader } from '@/pages/main/MainPage.loader';

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
        loader: MainPageLoader(queryClient),
    },
    {
        path: 'login',
        element: <LoginPage />,
    },
]);
