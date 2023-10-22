import { makeAutoObservable } from "mobx";
import { RegisterRequest, LoginRequest, User } from "../models/account";
import agent from "../api/agent";
import { store } from "./store";
import { router } from "../router/routes";

export default class UserStore {
    user: User | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    private setUser = (user: User | null) => (this.user = user);

    register = async (request: RegisterRequest) => {
        try {
            const user = await agent.Account.register(request);
            store.commonStore.setToken(user.token);
            this.setUser(user);
            router.navigate("/");
        } catch (error) {
            throw error;
        }
    };

    login = async (request: LoginRequest) => {
        try {
            const user = await agent.Account.login(request);
            store.commonStore.setToken(user.token);
            this.setUser(user);
            router.navigate("/");
        } catch (error) {
            throw error;
        }
    };

    logout = () => {
        store.commonStore.setToken(null);
        this.setUser(null);
        router.navigate("/");
    };

    getUser = async () => {
        try {
            const user = await agent.Account.currentUser();
            this.setUser(user);
        } catch (error) {
            console.log(error);
        }
    };
}
