// DEPENDENCIES
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

// COMPONENTS
import SignUp from "./Components/signUp";
import { MixerWrapper } from "./Components/mixersplashwrapper.js";
import Login from "./Components/login";
import NavBar from "./Components/navBar";
import Mixes from "./Components/mixes";

function App() {
    const [username, setUsername] = useState(
        JSON.parse(localStorage.getItem("username"))
    );

    useEffect(() => {
        setUsername(JSON.parse(localStorage.getItem("username")));
    }, []);

    return (
        <main>
            <NavBar username={username} />
            <Routes>
                <Route exact path="/" element={<MixerWrapper />} />
                <Route path="/audio" element={<Mixes />} />
                <Route path="register" element={<SignUp />} />
                <Route path="login" element={<Login setUsername={setUsername} />} />
            </Routes>
        </main>
    );
}

export default App;
