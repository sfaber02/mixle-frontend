import Dropdown from "./Dropdown";
import "../Styles/Nav.css";

export default function NavBar({ username }) {
    const handleIconClick = () => {};
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <button className="iconBtn" onClick={handleIconClick}>
                <i class="fa-solid fa-circle-info fa-lg"></i>
            </button>
            <a class="navbar-brand" href="/">
                MIXLE
            </a>
            <Dropdown username={username} />
        </nav>
    );
}
