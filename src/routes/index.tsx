import { createBrowserRouter } from "react-router-dom";

import MainPage from "@/pages/MainPage";

export const router = createBrowserRouter([
    {
        path: "/",
        // FIXME : 공통 fallback 컴포넌트 적용 필요
        errorElement: <div>에러</div>,
        element: <MainPage />,
        children: [
            {
                path: "auth",
                element: <MainPage />
            }
        ]
    },
])