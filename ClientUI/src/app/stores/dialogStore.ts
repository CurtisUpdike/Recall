import { makeAutoObservable } from "mobx";

interface Dialog {
    isOpen: boolean;
    body: JSX.Element | null;
    title: string | null;
}

export default class DialogStore {
    dialog: Dialog = {
        isOpen: false,
        body: null,
        title: null,
    };

    constructor() {
        makeAutoObservable(this);
    }

    openDialog = (conent: JSX.Element, title: string | null = null) => {
        this.dialog.isOpen = true;
        this.dialog.title = title;
        this.dialog.body = conent;
    };

    closeDialog = () => {
        this.dialog.isOpen = false;
        this.dialog.title = null;
        this.dialog.body = null;
    };
}
