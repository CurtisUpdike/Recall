import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { store } from "./store";
import { toast } from "../common/toast/toaster";

export default class DeckStore {
    repository = new Map<string, Deck>();
    loaded = false;
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    get decks() {
        return Array.from(this.repository.values());
    }

    private setLoaded = () => (this.loaded = true);
    private setLoading = (value: boolean) => (this.loading = value);
    private setDeck = (deck: Deck) => this.repository.set(deck.id, deck);

    loadDecks = async () => {
        try {
            const decks = await agent.Decks.all();
            decks.forEach(this.setDeck);
            this.setLoaded();
        } catch (error) {
            toast.error("Could not load decks");
            console.log(error);
        }
    };

    createDeck = async (deck: DeckRequest) => {
        try {
            const newDeck = await agent.Decks.create(deck);
            this.setDeck(newDeck);
            store.dialogStore.closeDialog();
        } catch (error) {
            toast.error(`${deck.name} failed to create`);
            throw error;
        }
    };

    updateDeck = async (deck: Deck) => {
        try {
            const updatedDeck = await agent.Decks.update(deck);
            this.setDeck(updatedDeck);
            store.dialogStore.closeDialog();
        } catch (error) {
            toast.error(`${deck.name} failed to update`);
            throw error;
        }
    };

    deleteDeck = async (deck: Deck) => {
        try {
            this.setLoading(true);
            await agent.Decks.delete(deck);
            this.repository.delete(deck.id);
            store.dialogStore.closeDialog();
        } catch (error) {
            toast.error(`${deck.name} failed to delete`);
            throw error;
        } finally {
            this.setLoading(false);
        }
    };
}
