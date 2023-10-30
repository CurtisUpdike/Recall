import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import { useEffect, useState } from "react";
import Loading from "../../../app/common/loading/Loading";
import { Card, CardList, H1, Icon } from "@blueprintjs/core";

function DeckPage() {
    const {
        deckStore: { loadDeck },
        cardStore: { cards, loaded: cardsLoaded, loadCards },
    } = useStore();
    const [deck, setDeck] = useState<Deck | null>(null);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        loadDeck(id!).then(setDeck);
        if (!cardsLoaded) loadCards();
    }, [cardsLoaded, loadCards]);

    if (!deck) return <Loading text="Loading deck..." />;
    if (!cardsLoaded) return <Loading text="Loading cards..." />;

    return (
        <>
            <H1>{deck.name}</H1>
            <CardList>
                {cards.map((card) => (
                    <Card
                        interactive={true}
                        style={{ justifyContent: "space-between" }}
                    >
                        <span>{card.front}</span>
                        <Icon icon="chevron-right" />
                    </Card>
                ))}
            </CardList>
        </>
    );
}

export default observer(DeckPage);
