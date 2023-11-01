import { Panel, PanelStack2 } from "@blueprintjs/core";
import React from "react";
import QuizPanel, { QuizPanelProps } from "./QuizPanel";
import FinishedPanel from "./FinishedPanel";

interface Props {
    cards: Card[];
}

export function Quiz({ cards }: Props) {
    const [stack, setStack] = React.useState<Array<Panel<QuizPanelProps>>>([
        {
            renderPanel: QuizPanel,
            props: { index: 0, card: cards[0] },
            title: "1",
        },
    ]);

    function addToPanelStack(panel: Panel<QuizPanelProps>) {
        if (panel.props!.index === cards.length) {
            panel.renderPanel = FinishedPanel;
            panel.title = "Finished";
        } else {
            panel.props!.card = cards[panel.props!.index!];
        }
        setStack((stack) => [...stack, panel]);
    }

    return (
        <PanelStack2
            className="quiz"
            onOpen={addToPanelStack}
            onClose={() => setStack((stack) => stack.slice(0, -1))}
            renderActivePanelOnly={true}
            showPanelHeader={true}
            stack={stack}
        />
    );
}

export default Quiz;
