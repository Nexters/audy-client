import { createBrowserRouter } from "react-router-dom";

import MainPage from "@/pages/main";
import LoginPage from "@/pages/auth/login";

export const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <div>에러</div>,
        element: <MainPage />,
    },
    {
        path: "auth",
        children: [
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "redirect",
                element: <></>,
            }
        ]
    }
])