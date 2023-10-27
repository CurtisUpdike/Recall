import { makeAutoObservable } from "mobx";

interface Dialog {
    isOpen: boolean;
    body: JSX.Element | null;
}

export default class DialogStore {
    dialog: Dialog = {
        isOpen: false,
        body: null,
    };

    constructor() {
        makeAutoObservable(this);
    }

    openDialog = (conent: JSX.Element) => {
        this.dialog.isOpen = true;
        this.dialog.body = conent;
    };

    closeDialog = () => {
        this.dialog.isOpen = false;
        this.dialog.body = null;
    };
}
