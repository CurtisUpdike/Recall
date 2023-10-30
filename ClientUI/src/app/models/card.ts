interface Card {
    id: string;
    front: string;
    back: string;
    deckId: string;
}

interface CardRequest {
    front: string;
    back: string;
    deckId: string;
}
