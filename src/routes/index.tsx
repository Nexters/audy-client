import type { PropsWithChildren } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider as JotaiAtomProvider } from 'jotai';
import { Outlet, createBrowserRouter } from 'react-router-dom';

import AppPortal from '@/components/app-portal';
import FeedbacksStacks from '@/components/feedbacks-stack';
import SnackBar from '@/components/snack-bar';
import Toast from '@/components/toast';
import { CoursePage, coursePageLoader } from '@/pages/course';
import LoginPage from '@/pages/login';
import MainPage from '@/pages/main';
import { TmapProvider } from '@/utils/tmap/TmapModuleProvider';
import { FeedbacksProvider } from '@/utils/ui/FeedBacksProvider';
import { ModalProvider } from '@/utils/ui/ModalProvider';
import { SnackBarProvider } from '@/utils/ui/SnackBarProvider';
import { ToastProvider } from '@/utils/ui/ToastProvider';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 0,
        },
    },
});

const UIProvider = ({ children }: PropsWithChildren) => (
    <AppPortal.Provider>
        <ToastProvider>
            <SnackBarProvider>
                <ModalProvider />
                <Toast />
                <SnackBar />
                {children}
            </SnackBarProvider>
        </ToastProvider>
    </AppPortal.Provider>
);

const InitializedRouter = () => (
    <QueryClientProvider client={queryClient}>
        <AppPortal.Provider>
            <JotaiAtomProvider>
                <UIProvider>
                    <FeedbacksProvider>
                        <FeedbacksStacks />
                        <TmapProvider
                            width="100%"
                            height="calc(100vh - 64px)"
                            lat={37.5652045}
                            lng={126.98702028}
                        >
                            <ReactQueryDevtools />
                            <Outlet />
                        </TmapProvider>
                    </FeedbacksProvider>
                </UIProvider>
            </JotaiAtomProvider>
        </AppPortal.Provider>
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
