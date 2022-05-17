import { useState } from "react";

const API = process.env.REACT_APP_API_URL;

function SignUp() {
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
            console.log("user", user);
            const content = await response.json();
            console.log("content", content);
        } catch (error) {
            return error;
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="txt_field">
                <label htmlFor="username">Create Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    autoComplete="off"
                    onChange={handleChange}
                    value={user.userName}
                    required
                />
            </div>
            <div className="txt_field">
                <label htmlFor="email">Enter Email:</label>
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
            <div className="txt_field">
                <label htmlFor="password">Create Password:</label>
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
            <div className="pass">Forgot Password?</div>
            <input type="submit" value="SignUp" />
        </form>
    );
}

export default SignUp;
