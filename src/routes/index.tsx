import { createBrowserRouter } from "react-router-dom";

import App from "@/App";

export const router = createBrowserRouter([
    {
        path: "/",
        // FIXME : 공통 fallback 컴포넌트 적용 필요
        errorElement: <div>에러</div>,
        element: <App />,
        children: [
            {
                path: "auth",
                element: <App />
            }
        ]
    },
])