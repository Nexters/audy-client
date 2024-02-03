import { createBrowserRouter } from "react-router-dom";

import MainPage from "@/pages/main";
import LoginPage from "@/pages/auth";

export const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <div>에러</div>,
        element: <MainPage />,
    },
    {
        path: "auth",
        element: <LoginPage />
    }
])