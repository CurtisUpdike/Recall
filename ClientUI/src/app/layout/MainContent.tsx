import { Outlet } from "react-router-dom";

const MainContent = () => (
    <div
        style={{
            padding: "4rem 2rem",
            flex: "1",
            width: "100%",
            maxWidth: "600px",
            alignSelf: "center",
        }}
    >
        <Outlet />
    </div>
);

export default MainContent;
