import { Spinner } from "@blueprintjs/core";

const LoadingPage = () => (
    <div
        style={{
            position: "fixed",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
        }}
    >
        <Spinner />
    </div>
);

export default LoadingPage;
