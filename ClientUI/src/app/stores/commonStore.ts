import { makeAutoObservable, reaction } from "mobx";

export default class CommonStore {
    token: string | null = localStorage.getItem("token");
    appLoaded = false;

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.token,
            (token) => {
                if (token) localStorage.setItem("token", token);
                else localStorage.removeItem("token");
            },
        );
    }

    setToken = (token: string | null) => {
        this.token = token;
    };

    setAppLoaded = () => (this.appLoaded = true);
}
