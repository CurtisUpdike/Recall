import { Card, Divider } from "@blueprintjs/core";
import { Card as CardModel } from "../../app/models/card";

interface Props {
    card: CardModel;
}

function CardDetails({ card }: Props) {
    return (
        <div>
            <Card>
                {card.front}
                <Divider style={{ margin: "20px" }} />
                {card.back}
            </Card>
        </div>
    );
}

export default CardDetails;
