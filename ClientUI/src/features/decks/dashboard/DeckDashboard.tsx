import { useEffect } from "react";
import { useStore } from "../../../app/stores/store";
import {
    Button,
    ButtonGroup,
    Card,
    CardList,
    H1,
    NonIdealState,
} from "@blueprintjs/core";
import { observer } from "mobx-react-lite";
import DeckForm from "../form/DeckForm";
import DeckDelete from "../form/DeckDelete";
import Loading from "../../../app/common/loading/Loading";
import { router } from "../../../app/router/routes";

function DeckDashboard() {
    const {
        deckStore: { loaded, loadDecks, decks },
        dialogStore: { openDialog },
    } = useStore();

    useEffect(() => {
        if (!loaded) loadDecks();
    }, [loaded, loadDecks]);

    if (!loaded) return <Loading text="Loading decks..." />;

    if (decks.length == 0)
        return (
            <NonIdealState
                title="You don't have any decks"
                action={
                    <Button
                        outlined={true}
                        text="Create deck"
                        icon="plus"
                        intent="primary"
                        onClick={() => openDialog(<DeckForm />)}
                    />
                }
            />
        );

    return (
        <>
            <H1 style={{ display: "flex", justifyContent: "space-between" }}>
                Decks{" "}
                <Button
                    outlined={true}
                    icon="plus"
                    intent="primary"
                    onClick={() => openDialog(<DeckForm />)}
                >
                    Create
                </Button>
            </H1>
            <CardList>
                {decks.map((deck) => (
                    <Card
                        key={deck.id}
                        style={{ justifyContent: "space-between" }}
                        interactive={true}
                        onClick={() => router.navigate(`/decks/${deck.id}`)}
                    >
                        <span>{deck.name}</span>
                        <ButtonGroup minimal>
                            <Button
                                text="Rename"
                                intent="primary"
                                onClick={() =>
                                    openDialog(<DeckForm deck={deck} />)
                                }
                            />
                            <Button
                                text="Delete"
                                intent="danger"
                                onClick={() =>
                                    openDialog(<DeckDelete deck={deck} />)
                                }
                            />
                        </ButtonGroup>
                    </Card>
                ))}
            </CardList>
        </>
    );
}

export default observer(DeckDashboard);
