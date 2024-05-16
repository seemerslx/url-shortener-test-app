import "./Header.css";
import Navigation from "./Navigation";

const Header = () => {
    return <>
        <header className="header">
            <div className="container">
                <Navigation />
            </div>
        </header>
    </>
};

export default Header;