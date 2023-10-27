import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import DeckStore from "./deckStore";
import DialogStore from "./dialogStore";

interface Store {
    commonStore: CommonStore;
    dialogStore: DialogStore;
    userStore: UserStore;
    deckStore: DeckStore;
}

export const store: Store = {
    commonStore: new CommonStore(),
    dialogStore: new DialogStore(),
    userStore: new UserStore(),
    deckStore: new DeckStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
