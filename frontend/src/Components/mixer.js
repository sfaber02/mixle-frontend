import React, { useEffect, useState } from 'react';

const Mixer = () => {
    const [showSplash, setShowSplash] = useState(false);

    
    
    useEffect(() => {
        if (showSplash) {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();

        }

    }, [showSplash]);

    const handleStartClick = () => setShowSplash(true);

    return (
        <>
            {!showSplash && (
                <div id='splashPageContainer'>
                    <h1>Splash Page</h1>
                    <button onClick={handleStartClick}>Start Mixing</button>
                </div>
            )}
            {showSplash && (
                <div id='mainMixerContainer'>
                    <h1>MIXER</h1>
                </div>
                
            )}
        </>
    );
}

export { Mixer };