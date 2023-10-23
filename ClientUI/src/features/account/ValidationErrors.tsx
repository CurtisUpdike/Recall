import { Callout } from "@blueprintjs/core";

interface Props {
    errors: string[];
}

function ValidationErrors({ errors }: Props) {
    return (
        <Callout
            intent="danger"
            title="We had trouble signing up:"
            style={{ marginBottom: "15px" }}
        >
            {errors.map((error, index) => (
                <div key={index}>{error}</div>
            ))}
        </Callout>
    );
}

export default ValidationErrors;
