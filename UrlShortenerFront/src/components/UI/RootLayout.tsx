import { Outlet } from "react-router-dom";
import Header from "./Header";

const RootLayout = () => {
    return <>
        <div className="grid-container">
            <Header />
            <main className="container"><Outlet /></main>
        </div>
    </>
};

export default RootLayout;
