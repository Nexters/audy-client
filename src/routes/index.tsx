import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet, createBrowserRouter } from 'react-router-dom';

import { CoursePage, coursePageLoader } from '@/pages/course';
import LoginPage from '@/pages/login';
import MainPage from '@/pages/main';
import { TmapProvider } from '@/utils/tmap/TmapModuleProvider';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 0,
        },
    },
});

const InitializedRouter = () => (
    <QueryClientProvider client={queryClient}>
        <TmapProvider
            width="100%"
            height="calc(100vh - 64px)"
            lat={37.5652045}
            lng={126.98702028}
        >
            <ReactQueryDevtools />
            <Outlet />
        </TmapProvider>
    </QueryClientProvider>
);

export const router = createBrowserRouter([
    {
        element: <InitializedRouter />,
        children: [
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
                path: '/course/:courseId',
                loader: coursePageLoader(queryClient),
                element: <CoursePage />,
            },
        ],
    },
]);
