// DEPENDENCIES
import { Routes, Route } from "react-router-dom";

// PAGES

// COMPONENTS
import SignUp from "./Components/signUp";
import { MixerWrapper } from "./Components/mixersplashwrapper.js";

function App() {
    return (
        <Routes>
            <Route exact path="/" element={<MixerWrapper />} />
            <Route path="register" element={<SignUp />} />
        </Routes>
    );
}

export default App;
