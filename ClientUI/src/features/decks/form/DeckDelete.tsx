import { Button, Icon } from "@blueprintjs/core";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

function DeckDelete({ deck }: { deck: Deck }) {
    const { deckStore, dialogStore } = useStore();

    return (
        <div>
            <div className="bp5-alert-body">
                <Icon icon="trash" intent="danger" />
                <div className="bp5-alert-contents">
                    <p>
                        Are you sure you want to delete <b>{deck.name}</b>?
                    </p>
                </div>
            </div>
            <div className="bp5-alert-footer">
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
