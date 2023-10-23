import { NonIdealState, Classes } from "@blueprintjs/core";
import { Link } from "react-router-dom";

const linkStyles = [Classes.BUTTON, Classes.INTENT_PRIMARY].join(" ");

const NotFound = () => (
    <div style={{ height: "80%" }}>
        <NonIdealState
            icon="search"
            title="Oops!"
            description="We couldn't find what you're looking for..."
            action={
                <Link to="/" className={linkStyles}>
                    Go to home page
                </Link>
            }
        />
    </div>
);

export default NotFound;
