import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import LoginForm from "../../features/account/LoginForm";
import RegisterForm from "../../features/account/RegisterForm";
import App from "../App";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import DeckPage from "../../features/decks/DeckPage";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <HomePage /> },
            { path: "register", element: <RegisterForm /> },
            { path: "login", element: <LoginForm /> },
            { path: "decks", element: <DeckPage /> },
            { path: "server-error", element: <ServerError /> },
            { path: "not-found", element: <NotFound /> },
            { path: "*", element: <Navigate replace to="not-found" /> },
        ],
    },
];

export const router = createBrowserRouter(routes);
