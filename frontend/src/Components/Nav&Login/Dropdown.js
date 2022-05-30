import { useNavigate } from "react-router-dom";

/**
 *
 * @param {Object} user -  user object used to manipulate dropdown element
 * @returns JSX for dropdown element
 */
export default function Dropdown({ user }) {
    const navigate = useNavigate();
    const handleSignOut = () => {
        localStorage.clear();
        return navigate("/");
    };

    if (user.username) {
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
                    {user.username + " "}
                </button>
                <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                >
                    <a className="dropdown-item" href="/audio">
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
