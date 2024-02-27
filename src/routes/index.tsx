import type { PropsWithChildren } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider as JotaiAtomProvider } from 'jotai';
import { Outlet, createBrowserRouter } from 'react-router-dom';

import AppPortal from '@/components/app-portal';
import FeedbacksStacks from '@/components/feedbacks-stack';
import { CoursePage, coursePageLoader } from '@/pages/course';
import { invitePageLoader } from '@/pages/invite/InvitePage.loader';
import LoginPage from '@/pages/login';
import MainPage from '@/pages/main';
import { TmapProvider } from '@/utils/tmap/TmapModuleProvider';
import { FeedbacksProvider } from '@/utils/ui/FeedBacksProvider';
import { ModalProvider } from '@/utils/ui/ModalProvider';

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
        <FeedbacksProvider>
            <ModalProvider />
            <FeedbacksStacks />
            {children}
        </FeedbacksProvider>
    </AppPortal.Provider>
);

const InitializedRouter = () => (
    <QueryClientProvider client={queryClient}>
        <AppPortal.Provider>
            <JotaiAtomProvider>
                <UIProvider>
                    <TmapProvider
                        width="100%"
                        height="calc(100vh - 64px)"
                        lat={37.5652045}
                        lng={126.98702028}
                    >
                        <ReactQueryDevtools />
                        <Outlet />
                    </TmapProvider>
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
            {
                path: '/invite/:invitationCode',
                loader: invitePageLoader,
                element: <div />,
            },
        ],
    },
]);
