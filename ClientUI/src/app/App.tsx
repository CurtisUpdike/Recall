import { useStore } from "./stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import Nav from "./layout/Nav";
import DialogContainer from "./common/dialog/DialogContainer";
import MainContent from "./layout/MainContent";
import Loading from "./common/loading/Loading";

function App() {
    const { commonStore, userStore } = useStore();

    useEffect(() => {
        if (commonStore.token)
            userStore.getUser().finally(commonStore.setAppLoaded);
        else commonStore.setAppLoaded();
    }, [commonStore, userStore]);

    if (!commonStore.appLoaded) return <Loading />;

    return (
        <>
            <DialogContainer />
            <Nav />
            <MainContent />
        </>
    );
}

export default observer(App);
