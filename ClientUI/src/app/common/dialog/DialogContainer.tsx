import { Dialog, DialogBody } from "@blueprintjs/core";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";

function DialogContainer() {
    const {
        dialogStore: { dialog, closeDialog },
    } = useStore();

    return (
        <Dialog
            isOpen={dialog.isOpen}
            onClose={closeDialog}
            title={dialog.title}
            style={{ marginLeft: "10px", marginRight: "10px" }}
        >
            <DialogBody>{dialog.body}</DialogBody>
        </Dialog>
    );
}

export default observer(DialogContainer);
