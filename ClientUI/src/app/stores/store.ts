import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import DeckStore from "./deckStore";
import DialogStore from "./dialogStore";
import CardStore from "./cardStore";

interface Store {
    commonStore: CommonStore;
    dialogStore: DialogStore;
    userStore: UserStore;
    deckStore: DeckStore;
    cardStore: CardStore;
}

export const store: Store = {
    commonStore: new CommonStore(),
    dialogStore: new DialogStore(),
    userStore: new UserStore(),
    deckStore: new DeckStore(),
    cardStore: new CardStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
