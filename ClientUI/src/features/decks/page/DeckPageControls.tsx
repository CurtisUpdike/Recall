import { Button, ButtonGroup, Popover } from "@blueprintjs/core";
import CardForm from "../../cards/CardForm";
import { useStore } from "../../../app/stores/store";
import EditMenu from "./DeckEditMenu";
import Quiz from "../../quiz/Quiz";
import { Deck } from "../../../app/models/deck";
import { Card } from "../../../app/models/card";

interface Props {
    deck: Deck;
    cards: Card[];
}

function DeckPageControls({ deck, cards }: Props) {
    const {
        dialogStore: { openDialog },
    } = useStore();

    return (
        <ButtonGroup>
            <Popover
                content={<EditMenu deck={deck} />}
                placement="bottom-start"
            >
                <Button icon="edit" rightIcon="caret-down" text="Edit deck" />
            </Popover>
            <Button
                icon="plus"
                onClick={() =>
                    openDialog(<CardForm deckId={deck.id} />, "New card")
                }
                text="New card"
            />
            <Button
                icon="lightning"
                text="Quiz"
                disabled={cards.length < 1}
                onClick={() =>
                    openDialog(
                        <Quiz
                            cards={cards
                                .map((value) => ({
                                    value,
                                    sort: Math.random(),
                                }))
                                .sort((a, b) => a.sort - b.sort)
                                .map(({ value }) => value)}
                        />,
                        deck.name,
                    )
                }
            />
        </ButtonGroup>
    );
}

export default DeckPageControls;
