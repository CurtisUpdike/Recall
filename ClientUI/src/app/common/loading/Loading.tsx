import { Spinner } from "@blueprintjs/core";

export default function Loading(props: { text?: string }) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
            }}
        >
            <Spinner />
            <div style={{ marginTop: "1rem" }}>{props.text}</div>
        </div>
    );
}
