import Dropdown from "./Dropdown";
import "../../Styles/Nav.css";

export default function NavBar({ username }) {
    const handleIconClick = () => {};
    return (
        <nav
            className="navbar navbar-expand-lg navbar-light"
            style={{ "background-color": "#e3f2fd" }}
        >
            <button className="iconBtn" onClick={handleIconClick}>
                <i className="fa-solid fa-circle-info fa-lg"></i>
            </button>
            <a className="navbar-brand" href="/">
                MIXLE
            </a>
            <Dropdown username={username} />
        </nav>
    );
}
