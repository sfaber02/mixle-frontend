// DEPENDENCIES
import { Routes, Route } from "react-router-dom";

// PAGES

// COMPONENTS
import SignUp from "./Components/signUp";
import { MixerWrapper } from "./Components/mixersplashwrapper.js";
import Login from "./Components/login";
import NavBar from "./Components/navBar";

function App() {
    return (
        <main>
            <NavBar />
            <Routes>
                <Route exact path="/" element={<MixerWrapper />} />
                <Route path="register" element={<SignUp />} />
                <Route path="login" element={<Login />} />
            </Routes>
        </main>
    );
}

export default App;
