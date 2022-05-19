// DEPENDENCIES
import { Routes, Route } from "react-router-dom";

// PAGES

// COMPONENTS
import SignUp from "./Components/signUp";
import { MixerWrapper } from "./Components/mixersplashwrapper.js";
import Login from "./Components/login";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route exact path="/" element={<MixerWrapper />} />
                <Route path="register" element={<SignUp />} />
                <Route path="login" element={<Login />} />
            </Routes>
        </div>
    );
}

export default App;
