import React from "react";

const PlaySpeed = (props) => {
    const fx = props.fx;
    const handleSetFx = props.handleSetFx;

    return (
        <div id="playSpeedContainer">
            <label>Speed</label>
            <input
                id="speed.rate"
                class="playSpeedSliders"
                type="range"
                min=".1"
                max="4"
                step=".1"
                value={fx.speed.rate}
                onChange={handleSetFx}
            />
            <br />
            <label>Detune</label>
            <input
                id="speed.detune"
                class="playSpeedSliders"
                type="range"
                min="-2400"
                max="2400"
                step="100"
                value={fx.speed.detune}
                onChange={handleSetFx}
            />
        </div>
    );
};

export { PlaySpeed };
