import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/SignUp.css";

const API = process.env.REACT_APP_API_URL;

function SignUp() {
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
            const response = await fetch(`${API}/user/register`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            return navigate("/");
            // const content = await response.json();
        } catch (error) {
            return error;
        }
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit}>
                <h3>Register for Mixle!</h3>
                <div>
                    <i className="fas fa-user"></i>
                    <input
                        type="text"
                        id="username"
                        name="username"
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
                        id="password"
                        autoComplete="off"
                        onChange={handleChange}
                        value={user.password}
                        required
                    />
                </div>
                <input type="submit" value="SignUp" />
                <input type="submit" value="Login" />
            </form>
        </div>
    );
}

export default SignUp;
