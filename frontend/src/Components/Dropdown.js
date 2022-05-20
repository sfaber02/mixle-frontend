import { useNavigate } from "react-router-dom";

export default function Dropdown({ username }) {
    const navigate = useNavigate();
    const handleSignOut = () => {
        localStorage.clear();
        return navigate("/");
    };

    if (username) {
        return (
            <div class="dropdown">
                <button
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    {username + " "}
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" href="/">
                        View Today's Mixes
                    </a>
                    <a class="dropdown-item" href="/">
                        My Mixes
                    </a>
                    <a class="dropdown-item" href="/" onClick={handleSignOut}>
                        Signout
                    </a>
                </div>
            </div>
        );
    } else {
        return (
            <div class="dropdown">
                <button
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    Welcome
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" href="/login">
                        Login
                    </a>
                    <a class="dropdown-item" href="/register">
                        Register
                    </a>
                </div>
            </div>
        );
    }
}
