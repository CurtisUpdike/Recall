import { useStore } from "./stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingPage from "./common/loading/LoadingPage";
import { Outlet } from "react-router-dom";
import Nav from "./layout/Nav";
import DialogContainer from "./common/dialog/DialogContainer";

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
            <DialogContainer />
            <Nav />
            <div style={{ margin: "4rem 6rem", flex: "1" }}>
                <Outlet />
            </div>
        </>
    );
}

export default observer(App);
