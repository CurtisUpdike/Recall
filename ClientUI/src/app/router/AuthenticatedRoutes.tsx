import { Navigate, Outlet } from "react-router-dom";
import { useStore } from "../stores/store";

export default function AuthenticatedRoutes() {
    const { userStore } = useStore();

    return userStore.isLoggedIn ? <Outlet /> : <Navigate to="/" />;
}
