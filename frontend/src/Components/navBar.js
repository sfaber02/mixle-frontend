import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import "../Styles/Nav.css";

export default function NavBar() {
    return (
        <div className="navbar-container">
            <ul>
                <li>
                    <i class="fa-solid fa-circle-info fa-lg"></i>
                </li>
                <li>
                    <Link to={"/"}>
                        <h1>MIXLE</h1>
                    </Link>
                </li>
                <li>
                    <Dropdown />
                </li>
            </ul>
        </div>
    );
}
