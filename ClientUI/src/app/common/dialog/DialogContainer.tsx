import { Dialog, DialogBody } from "@blueprintjs/core";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";

function DialogContainer() {
    const {
        dialogStore: { dialog, closeDialog },
    } = useStore();

    return (
        <Dialog isOpen={dialog.isOpen} onClose={closeDialog}>
            <DialogBody>{dialog.body}</DialogBody>
        </Dialog>
    );
}

export default observer(DialogContainer);
