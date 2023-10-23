import { NonIdealState, Classes } from "@blueprintjs/core";
import { Link } from "react-router-dom";

const NotFound = () => (
    <div style={{ height: "80%" }}>
        <NonIdealState
            icon="search"
            title="Oops!"
            description="We couldn't find what you're looking for..."
            action={
                <Link
                    to="/"
                    className={[Classes.BUTTON, Classes.INTENT_PRIMARY].join(
                        " ",
                    )}
                >
                    Go to home page
                </Link>
            }
        />
    </div>
);

export default NotFound;
