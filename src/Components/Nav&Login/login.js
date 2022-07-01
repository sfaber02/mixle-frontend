import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/Login.css";

const API = process.env.REACT_APP_API_URL;

/**
 *
 * @param {object} userDetails - useState passed from app.js containing user information if logged in
 * @param {function} setUserDetails - useState passed down from parent component to set username and userid from api call
 * @returns JSX for login page
 */
function Login({ userDetails, setUserDetails }) {
    let navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: "",
        user_id: userDetails.user_id,
    });

    // redirect user from login if they are already logged in
    useEffect(() => {
        if (user.user_id) {
            navigate("/");
        }
    }, [user.user_id, navigate]);

    // handleChange for input elements
    const handleChange = (event) => {
        setUser({ ...user, [event.target.id]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // async function to get user data
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
                return data;
            }
            const data = await postFetch();

            // conditionls check fetch data if incorrect password or email
            if (!data.error) {
                localStorage.setItem("user_id", JSON.stringify(data.user_id));
                localStorage.setItem("username", JSON.stringify(data.username));
                setUserDetails({
                    username: data.username,
                    user_id: data.user_id,
                });
                return navigate("/");
            } else if (data.error === "password") {
                setUser({ ...user, password: "" });
                alert("Incorrect Password Please Try Again");
            } else if (data.error === "email") {
                setUser({ ...user, email: "" });
                alert("Incorrect Email Please Try Again");
            }
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
