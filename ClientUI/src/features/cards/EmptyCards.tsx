import { Button, NonIdealState } from "@blueprintjs/core";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import CardForm from "./CardForm";

function EmptyCards({ deckId }: { deckId: string }) {
    const {
        dialogStore: { openDialog },
    } = useStore();

    return (
        <NonIdealState
            title="You don't have any cards"
            action={
                <Button
                    text="Create card"
                    icon="plus"
                    intent="primary"
                    onClick={() => openDialog(<CardForm deckId={deckId} />)}
                />
            }
        />
    );
}

export default observer(EmptyCards);
