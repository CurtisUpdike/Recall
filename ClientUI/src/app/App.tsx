import { useStore } from "./stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingPage from "./common/loading/LoadingPage";
import { Outlet } from "react-router-dom";
import Nav from "./layout/Nav";

function App() {
    const { commonStore, userStore } = useStore();

    useEffect(() => {
        if (commonStore.token)
            userStore.getUser().finally(commonStore.setAppLoaded);
        else commonStore.setAppLoaded();
    }, [commonStore, userStore]);

    if (!commonStore.appLoaded) return <LoadingPage />;

    return (
        <>
            <Nav />
            <Outlet />
        </>
    );
}

export default observer(App);
