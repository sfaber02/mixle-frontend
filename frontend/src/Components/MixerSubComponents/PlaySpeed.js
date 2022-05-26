import React from "react";

/**
 * Play Speed component of mixer
 * @param {object} props 
 * @param {object} fx from mixer component
 * @param {function} OnChange handler to set FX from mixer component  
 * 
 * @returns JSX for Play Speed section of mixer
 */
const PlaySpeed = (props) => {
    const fx = props.fx;
    const handleSetFx = props.handleSetFx;

    return (
        <div id="playSpeedContainer">
            <div className="playSpeedSliderContainer">
                <label className="playSpeedLabel">Play Speed</label>
                <input
                    id="speed.rate"
                    className="playSpeedSliders"
                    type="range"
                    min=".1"
                    max="4"
                    step=".1"
                    value={fx.speed.rate}
                    onChange={handleSetFx}
                />
                <label className="playSpeedLabel2">{fx.speed.rate}</label>
            </div>
            <div className="playSpeedSliderContainer">
                <label className="playSpeedLabel">Detune</label>
                <input
                    id="speed.detune"
                    className="playSpeedSliders"
                    type="range"
                    min="-2400"
                    max="2400"
                    step="100"
                    value={fx.speed.detune}
                    onChange={handleSetFx}
                />
                <label id="playSpeedDetuneLabel">{fx.speed.detune} cents</label>
            </div>
        </div>
    );
};

export { PlaySpeed };
