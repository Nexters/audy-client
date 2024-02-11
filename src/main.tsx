import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { queryClient, router } from '@/routes/index.tsx';
import '@/styles/global.css';
import { TmapProvider } from '@/utils/tmap/TmapModuleProvider';

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <TmapProvider
            width="100%"
            height="calc(100vh - 64px)"
            lat={37.5652045}
            lng={126.98702028}
        >
            <RouterProvider router={router} />,
        </TmapProvider>
        <ReactQueryDevtools />
    </QueryClientProvider>,
);
