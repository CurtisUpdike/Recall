import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import { useEffect, useState } from "react";
import Loading from "../../../app/common/loading/Loading";
import {
    Button,
    ButtonGroup,
    Card,
    CardList,
    H1,
    Icon,
    Popover,
} from "@blueprintjs/core";
import CardForm from "../../cards/CardForm";

import EditMenu from "../menu/DeckEditMenu";
import EmptyCards from "../../cards/EmptyCards";

function DeckPage() {
    const {
        dialogStore: { openDialog },
        deckStore: { decks, loadDeck },
        cardStore: { cards, loaded: cardsLoaded, loadCards },
    } = useStore();
    const [deck, setDeck] = useState<Deck | null>(null);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        loadDeck(id!).then(setDeck);
        if (!cardsLoaded) loadCards();
    }, [decks, cardsLoaded, loadCards, id]);

    if (!deck) return <Loading text="Loading deck..." />;

    if (!cardsLoaded) return <Loading text="Loading cards..." />;

    const deckCards = cards.filter((c) => c.deckId === id);

    return (
        <>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <H1>{deck.name}</H1>
                <ButtonGroup>
                    <Popover
                        content={<EditMenu deck={deck} />}
                        placement="bottom-start"
                    >
                        <Button
                            icon="edit"
                            rightIcon="caret-down"
                            text="Edit"
                        />
                    </Popover>
                    <Button
                        icon="plus"
                        onClick={() =>
                            openDialog(<CardForm deckId={deck.id} />)
                        }
                        text="New card"
                    />
                </ButtonGroup>
            </div>

            {deckCards.length === 0 ? (
                <EmptyCards deckId={deck.id} />
            ) : (
                <CardList>
                    {deckCards.map((card) => (
                        <Card
                            interactive={true}
                            style={{ justifyContent: "space-between" }}
                            onClick={() =>
                                openDialog(
                                    <CardForm card={card} deckId={deck.id} />,
                                )
                            }
                        >
                            <span>{card.front}</span>
                            <Icon icon="chevron-right" />
                        </Card>
                    ))}
                </CardList>
            )}
        </>
    );
}

export default observer(DeckPage);
