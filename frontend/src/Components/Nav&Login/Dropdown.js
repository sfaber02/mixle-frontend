import { useNavigate } from "react-router-dom";

export default function Dropdown({ username }) {
    const navigate = useNavigate();
    const handleSignOut = () => {
        localStorage.clear();
        return navigate("/");
    };

    if (username) {
        return (
            <div className="dropdown">
                <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    {username + " "}
                </button>
                <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                >
                    <a className="dropdown-item" href="/">
                        View Today's Mixes
                    </a>
                    <a className="dropdown-item" href="/">
                        My Mixes
                    </a>
                    <a
                        className="dropdown-item"
                        href="/"
                        onClick={handleSignOut}
                    >
                        Signout
                    </a>
                </div>
            </div>
        );
    } else {
        return (
            <div className="dropdown">
                <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    Welcome
                </button>
                <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                >
                    <a className="dropdown-item" href="/login">
                        Login
                    </a>
                    <a className="dropdown-item" href="/register">
                        Register
                    </a>
                </div>
            </div>
        );
    }
}
