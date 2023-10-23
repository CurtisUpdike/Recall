import { NonIdealState } from "@blueprintjs/core";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";

function ServerError() {
    const { commonStore } = useStore();

    return (
        <div style={{ marginTop: "30px" }}>
            <NonIdealState
                icon="error"
                title="Server Error"
                description={commonStore.error?.message}
            />
            {commonStore.error?.details && (
                <div style={{ margin: "50px" }}>
                    <code>{commonStore.error?.details}</code>
                </div>
            )}
        </div>
    );
}

export default observer(ServerError);
