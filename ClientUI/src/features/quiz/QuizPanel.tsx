import { Button, Divider, PanelProps } from "@blueprintjs/core";
import { useState } from "react";

export interface QuizPanelProps {
    card?: Card;
    index?: number;
}

function QuizPanel({ openPanel, card, index }: PanelProps<QuizPanelProps>) {
    const [show, setShow] = useState(false);

    return (
        <div className="quiz-panel">
            <div className="quiz-panel-contents">
                <div className="quiz-panel-text">{card?.front}</div>
                <Divider style={{ margin: "0 2rem" }} />
                <div className="quiz-panel-text">
                    {!show && <div className="quiz-panel-cover" />}
                    {card?.back}
                </div>
            </div>
            {!show ? (
                <Button onClick={() => setShow(true)} fill>
                    Show
                </Button>
            ) : (
                <Button
                    intent="primary"
                    onClick={() =>
                        openPanel({
                            props: {
                                index: index! + 1,
                            },
                            renderPanel: QuizPanel,
                            title: `${index! + 2}`,
                        })
                    }
                    fill
                    text="Next"
                />
            )}
        </div>
    );
}

export default QuizPanel;
