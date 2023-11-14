import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { toast } from "../common/toast/toaster";
import { store } from "./store";
import { Card, CardRequest } from "../models/card";

export default class CardStore {
    repository = new Map<string, Card>();
    loaded = false;
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    get cards() {
        return Array.from(this.repository.values());
    }

    private setLoaded = () => (this.loaded = true);
    private setLoading = (value: boolean) => (this.loading = value);
    private setCard = (card: Card) => this.repository.set(card.id, card);
    private removeCard = (card: Card) => this.repository.delete(card.id);

    loadCards = async () => {
        try {
            const cards = await agent.Cards.all();
            cards.forEach(this.setCard);
            this.setLoaded();
        } catch (error) {
            toast.error("Could not load cards");
        }
    };

    createCard = async (card: CardRequest) => {
        try {
            this.setLoading(true);
            const newCard = await agent.Cards.create(card);
            this.setCard(newCard);
        } catch {
            toast.error("Failed to create card");
        } finally {
            store.dialogStore.closeDialog();
            this.setLoading(false);
        }
    };

    updateCard = async (card: Card) => {
        try {
            this.setLoading(true);
            await agent.Cards.update(card);
            this.setCard(card);
        } catch {
            toast.error("Failed to update card");
        } finally {
            store.dialogStore.closeDialog();
            this.setLoading(false);
        }
    };

    deleteCard = async (card: Card) => {
        try {
            this.setLoading(true);
            await agent.Cards.delete(card.id);
            this.removeCard(card);
        } catch {
            toast.error("Failed to delete card");
        } finally {
            store.dialogStore.closeDialog();
            this.setLoading(false);
        }
    };
}
