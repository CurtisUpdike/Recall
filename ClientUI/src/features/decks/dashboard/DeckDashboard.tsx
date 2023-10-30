import { useEffect } from "react";
import { useStore } from "../../../app/stores/store";
import { Button, Card, CardList, H1, Icon } from "@blueprintjs/core";
import { observer } from "mobx-react-lite";
import DeckForm from "../form/DeckForm";
import Loading from "../../../app/common/loading/Loading";
import { router } from "../../../app/router/routes";
import EmptyDecks from "./EmptyDecks";

function DeckDashboard() {
    const {
        deckStore: { loaded, loadDecks, decks },
        dialogStore: { openDialog },
    } = useStore();

    useEffect(() => {
        if (!loaded) loadDecks();
    }, [loaded, loadDecks]);

    if (!loaded) return <Loading text="Loading decks..." />;

    return (
        <>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <H1>Decks</H1>
                <Button icon="plus" onClick={() => openDialog(<DeckForm />)}>
                    New deck
                </Button>
            </div>
            {decks.length === 0 ? (
                <EmptyDecks />
            ) : (
                <CardList>
                    {decks.map((deck) => (
                        <Card
                            key={deck.id}
                            style={{ justifyContent: "space-between" }}
                            interactive={true}
                            onClick={() => router.navigate(`/decks/${deck.id}`)}
                        >
                            <span>{deck.name}</span>
                            <Icon icon="chevron-right" />
                        </Card>
                    ))}
                </CardList>
            )}
        </>
    );
}

export default observer(DeckDashboard);
