import { Button, Classes, Icon } from "@blueprintjs/core";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Card } from "../../app/models/card";

function CardDelete({ card }: { card: Card }) {
    const { cardStore, dialogStore } = useStore();

    return (
        <div>
            <div className={Classes.ALERT_BODY}>
                <Icon icon="trash" intent="danger" size={40} />
                <div className={Classes.ALERT_CONTENTS}>
                    <p>Are you sure you want to delete this card?</p>
                </div>
            </div>
            <div className={Classes.ALERT_FOOTER}>
                <Button
                    intent="danger"
                    onClick={() => cardStore.deleteCard(card)}
                    loading={cardStore.loading}
                >
                    Delete
                </Button>
                <Button
                    onClick={() => dialogStore.closeDialog()}
                    disabled={cardStore.loading}
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
}

export default observer(CardDelete);
