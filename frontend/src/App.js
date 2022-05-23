// DEPENDENCIES
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

// COMPONENTS
import SignUp from "./Components/Nav&Login/signUp";
import { MixerWrapper } from "./Components/mixersplashwrapper.js";
import Login from "./Components/Nav&Login/login";
import NavBar from "./Components/Nav&Login/navBar";
import Mixes from "./Components/mixes.js";

function App() {
    const [userDetails, setUserDetails] = useState({
        username: JSON.parse(localStorage.getItem("username")),
        user_id: JSON.parse(localStorage.getItem("user_id")),
    });

    useEffect(() => {
        setUserDetails({
            username: JSON.parse(localStorage.getItem("username")),
            user_id: JSON.parse(localStorage.getItem("user_id")),
        });
    }, [userDetails]);

    return (
        <main>
            <NavBar user={userDetails} />
            <Routes>
                <Route exact path="/" element={<MixerWrapper />} />
                <Route path="/audio" element={<Mixes />} />
                <Route path="/register" element={<SignUp />} />
                <Route
                    path="/login"
                    element={
                        <Login
                            userDetails={userDetails}
                            setUserDetails={setUserDetails}
                        />
                    }
                />
            </Routes>
        </main>
    );
}

export default App;
