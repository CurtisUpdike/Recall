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

    private setLoaded = (value: boolean) => (this.loaded = value);
    private setLoading = (value: boolean) => (this.loading = value);
    private getDeck = (id: string) => this.repository.get(id);
    private setDeck = (deck: Deck) => this.repository.set(deck.id, deck);

    loadDecks = async () => {
        try {
            const decks = await agent.Decks.all();
            decks.forEach(this.setDeck);
            this.setLoaded(true);
        } catch (error) {
            toast.error("Could not load decks");
        }
    };

    loadDeck = async (id: string) => {
        let deck = this.getDeck(id);
        if (deck) return deck;
        else {
            try {
                deck = await agent.Decks.get(id);
                return deck;
            } catch (error) {
                throw error;
            } finally {
                this.setLoaded(false);
            }
        }
    };

    createDeck = async (deck: DeckRequest) => {
        try {
            this.setLoading(true);
            const newDeck = await agent.Decks.create(deck);
            this.setDeck(newDeck);
        } catch (error) {
            toast.error(`${deck.name} failed to create`);
        } finally {
            store.dialogStore.closeDialog();
            this.setLoading(false);
        }
    };

    updateDeck = async (deck: Deck) => {
        try {
            this.setLoading(true);
            await agent.Decks.update(deck);
            this.setDeck(deck);
        } catch (error) {
            toast.error(`${deck.name} failed to update`);
        } finally {
            store.dialogStore.closeDialog();
            this.setLoading(false);
        }
    };

    deleteDeck = async (deck: Deck) => {
        try {
            this.setLoading(true);
            await agent.Decks.delete(deck.id);
            this.repository.delete(deck.id);
        } catch (error) {
            toast.error(`${deck.name} failed to delete`);
        } finally {
            store.dialogStore.closeDialog();
            this.setLoading(false);
        }
    };
}
