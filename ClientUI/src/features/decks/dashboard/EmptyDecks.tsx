import { Button, NonIdealState } from "@blueprintjs/core";
import DeckForm from "../form/DeckForm";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

function EmptyDecks() {
    const {
        dialogStore: { openDialog },
    } = useStore();

    return (
        <NonIdealState
            title="You don't have any decks"
            action={
                <Button
                    text="Create deck"
                    icon="plus"
                    intent="primary"
                    onClick={() => openDialog(<DeckForm />)}
                />
            }
        />
    );
}

export default observer(EmptyDecks);
