import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthenticationContext from "../Auth/AuthenticationContext";
import Authorized from "../Auth/Authorized";
import { logout } from "../Auth/handlejwt";
import Button from "./Button";
import "./Navigation.css";

const Navigation = () => {
    const { update, claims } = useContext(AuthenticationContext);

    function getUserEmail(): string {
        return claims.filter(x => x.name === "email")[0]?.value;
    }

    return <>
        <nav className="header-nav">
            <ul style={{ margin: "0px" }} className="header-nav-list">
                <li className="header-nav-list-item">
                    <NavLink to={"/"} className="logo">Shortener-App</NavLink>
                </li>
                <li className="header-nav-list-item"><NavLink className="nav-link" to={"/"}>Home</NavLink></li>
                <li className="header-nav-list-item"><NavLink className="nav-link" to={"/urls"}>Urls</NavLink></li>
                <li className="header-nav-list-item"><NavLink className="nav-link" to={"/about"}>About</NavLink></li>
            </ul>
            <div className="d-flex gap-3">
                <Authorized
                    authorized={
                        <>
                            <span className="nav-link">Hello, {getUserEmail()}</span>
                            <Button className="nav-link btn btn-link"
                                onClick={() => {
                                    logout();
                                    update([]);
                                }}>Logout</Button>
                        </>}
                    notAuthorized={
                        <>
                            <NavLink className="nav-link" to={"/login"}>Login</NavLink>
                            <NavLink className="nav-link" to={"/register"}>Register</NavLink>
                        </>} />
            </div>
        </nav>
    </>
};

export default Navigation;