import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import LoginForm from "../../features/account/LoginForm";
import RegisterForm from "../../features/account/RegisterForm";
import App from "../App";
import HomePage from "../../features/home/homePage";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <HomePage /> },
            { path: "register", element: <RegisterForm /> },
            { path: "login", element: <LoginForm /> },
            { path: "*", element: <Navigate replace to="not-found" /> },
        ],
    },
];

export const router = createBrowserRouter(routes);
