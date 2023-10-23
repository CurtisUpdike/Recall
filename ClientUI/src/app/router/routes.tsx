import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import LoginForm from "../../features/account/LoginForm";
import RegisterForm from "../../features/account/RegisterForm";
import App from "../App";
import TestErrors from "../../features/testing/TestError";
import NotFound from "../../features/errors/NotFound";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <HomePage /> },
            { path: "register", element: <RegisterForm /> },
            { path: "login", element: <LoginForm /> },
            { path: "not-found", element: <NotFound /> },
            { path: "*", element: <Navigate replace to="not-found" /> },
        ],
    },
];

export const router = createBrowserRouter(routes);
