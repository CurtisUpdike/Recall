import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import App from "../App";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import DeckDashboard from "../../features/decks/dashboard/DeckDashboard";
import DeckPage from "../../features/decks/page/DeckPage";
import AuthenticatedRoutes from "./AuthenticatedRoutes";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                element: <AuthenticatedRoutes />,
                children: [
                    { path: "decks", element: <DeckDashboard /> },
                    { path: "decks/:id", element: <DeckPage /> },
                ],
            },
            { path: "/", element: <HomePage /> },
            { path: "server-error", element: <ServerError /> },
            { path: "not-found", element: <NotFound /> },
            { path: "*", element: <Navigate replace to="not-found" /> },
        ],
    },
];

export const router = createBrowserRouter(routes);
