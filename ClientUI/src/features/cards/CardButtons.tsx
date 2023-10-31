import { Button, ButtonGroup, Divider } from "@blueprintjs/core";
import { useStore } from "../../app/stores/store";
import CardForm from "./CardForm";
import CardDelete from "./CardDelete";
import CardDetails from "./CardDetails";

interface Props {
    card: Card;
    deck: Deck;
}

function CardButtons({ card, deck }: Props) {
    const {
        dialogStore: { openDialog },
    } = useStore();
    return (
        <ButtonGroup minimal style={{ marginLeft: "1rem" }}>
            <Divider />
            <Button
                icon="eye-open"
                onClick={() => openDialog(<CardDetails card={card} />, "")}
            />
            <Button
                icon="edit"
                onClick={() =>
                    openDialog(
                        <CardForm card={card} deckId={deck.id} />,
                        "Edit card",
                    )
                }
            />
            <Button
                icon="trash"
                onClick={() => openDialog(<CardDelete card={card} />)}
            />
        </ButtonGroup>
    );
}

export default CardButtons;
