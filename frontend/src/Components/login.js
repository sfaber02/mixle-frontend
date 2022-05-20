import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css";

const API = process.env.REACT_APP_API_URL;

function Login() {
    let navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: "",
        user_id: null,
    });

    const handleChange = (event) => {
        setUser({ ...user, [event.target.id]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            async function postFetch() {
                const response = await fetch(`${API}/user/login`, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(user),
                });

                const data = await response.json();
                localStorage.setItem("user_id", JSON.stringify(data.user_id));
            }
            postFetch();
            return navigate("/");
        } catch (error) {
            return error;
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h3>Login into Mixle!</h3>
                <div>
                    <label htmlFor="email">
                        <i className="fas fa-at"></i>
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="email"
                        autoComplete="off"
                        onChange={handleChange}
                        value={user.email}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">
                        <i className="fas fa-lock"></i>
                    </label>
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        id="password"
                        autoComplete="off"
                        onChange={handleChange}
                        value={user.password}
                        required
                    />
                </div>
                <input type="submit" value="Login" />
            </form>
        </div>
    );
}

export default Login;
