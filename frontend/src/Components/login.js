import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css";

const API = process.env.REACT_APP_API_URL;

function Login() {
    let navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (event) => {
        setUser({ ...user, [event.target.id]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${API}/user/login`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            localStorage.setItem("user_id", JSON.stringify(response.body.JSON().user_id));
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
                    <i className="fas fa-user"></i>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="username"
                        autoComplete="off"
                        onChange={handleChange}
                        value={user.username}
                        required
                    />
                </div>
                <div>
                    <i className="fas fa-at"></i>
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
                    <i className="fas fa-lock"></i>
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
