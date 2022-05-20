// import { Link } from "react-router-dom";
// import Dropdown from "./Dropdown";
// import "../Styles/Nav.css";

export default function NavBar() {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <i class="fa-solid fa-circle-info fa-lg"></i>
            <a class="navbar-brand" href="#">
                MIXLE
            </a>
            <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">
                            View Today's Mixes{" "}
                            <span class="sr-only">(current)</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            My Mixes
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            Signout
                        </a>
                    </li>
                    <li class="nav-item dropdown">
                        <a
                            class="nav-link dropdown-toggle"
                            href="#"
                            id="navbarDropdownMenuLink"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            Dropdown link
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
        // <div className="navbar-container">
        //     <ul>
        //         <li>
        //
        //         </li>
        //         <li>
        //             <Link to={"/"}>
        //                 <h1>MIXLE</h1>
        //             </Link>
        //         </li>
        //         <li>
        //             <Dropdown />
        //         </li>
        //     </ul>
        // </div>
    );
}
