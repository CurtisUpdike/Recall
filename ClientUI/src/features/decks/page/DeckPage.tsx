import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import { useEffect, useState } from "react";
import Loading from "../../../app/common/loading/Loading";
import { Card, CardList, H1 } from "@blueprintjs/core";
import EmptyCards from "../../cards/EmptyCards";
import CardButtons from "../../cards/CardButtons";
import DeckPageControls from "./DeckPageControls";
import { Deck } from "../../../app/models/deck";

function DeckPage() {
    const {
        deckStore: { decks, loadDeck },
        cardStore: { cards, loaded: cardsLoaded, loadCards },
    } = useStore();
    const [deck, setDeck] = useState<Deck | null>(null);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        loadDeck(id!).then((d) => setDeck(d || null));
        if (!cardsLoaded) loadCards();
    }, [decks, cardsLoaded, loadCards, id, loadDeck]);

    if (!deck) return <Loading text="Loading deck..." />;

    if (!cardsLoaded) return <Loading text="Loading cards..." />;

    const deckCards = cards.filter((c) => c.deckId === id);

    return (
        <>
            <div className="section-header">
                <H1>{deck.name}</H1>
                <DeckPageControls deck={deck} cards={deckCards} />
            </div>

            {deckCards.length === 0 ? (
                <EmptyCards deckId={deck.id} />
            ) : (
                <CardList>
                    {deckCards.map((card) => (
                        <Card style={{ justifyContent: "space-between" }}>
                            <span>{card.front}</span>
                            <CardButtons card={card} deck={deck} />
                        </Card>
                    ))}
                </CardList>
            )}
        </>
    );
}

export default observer(DeckPage);
