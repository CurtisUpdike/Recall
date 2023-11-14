import { Button, Classes, Icon } from "@blueprintjs/core";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Deck } from "../../../app/models/deck";

function DeckDelete({ deck }: { deck: Deck }) {
    const { deckStore, dialogStore } = useStore();

    return (
        <div>
            <div className={Classes.ALERT_BODY}>
                <Icon icon="trash" intent="danger" size={40} />
                <div className={Classes.ALERT_CONTENTS}>
                    <p>
                        Are you sure you want to delete <b>{deck.name}</b>?
                    </p>
                </div>
            </div>
            <div className={Classes.ALERT_FOOTER}>
                <Button
                    intent="danger"
                    onClick={() => deckStore.deleteDeck(deck)}
                    loading={deckStore.loading}
                >
                    Delete
                </Button>
                <Button
                    onClick={() => dialogStore.closeDialog()}
                    disabled={deckStore.loading}
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
}

export default observer(DeckDelete);
