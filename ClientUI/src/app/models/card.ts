export interface Card {
    id: string;
    front: string;
    back: string;
    deckId: string;
}

export interface CardRequest {
    front: string;
    back: string;
    deckId: string;
}
