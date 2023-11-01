import { H3 } from "@blueprintjs/core";

export interface FinishedPanel {}

function FinishedPanel() {
    return (
        <div className="quiz-panel">
            <div
                className="quiz-panel-content"
                style={{
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: "1",
                }}
            >
                <H3>You have no more cards left!</H3>
            </div>
        </div>
    );
}

export default FinishedPanel;
