import { Outlet } from "react-router-dom";

const MainContent = () => (
    <div className="main-container">
        <div className="main-content">
            <Outlet />
        </div>
    </div>
);

export default MainContent;
