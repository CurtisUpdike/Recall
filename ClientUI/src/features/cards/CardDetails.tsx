import { Card, Divider } from "@blueprintjs/core";

interface Props {
    card: Card;
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
