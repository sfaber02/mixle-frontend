import React from "react";

const Delay = (props) => {
    const fx = props.fx;
    const handleSetFx = props.handleSetFx;

    return (
        <div id="delayContainer">
            <label>Delay Time {fx.delay.time * 1000}ms</label>
            <input
                id="delay.time"
                class="delaySliders"
                type="range"
                min="0"
                max="1"
                step=".01"
                value={fx.delay.time}
                onChange={handleSetFx}
            />
            <br />
            <label>Feedback</label>
            <input
                id="delay.feedback"
                class="delaySliders"
                type="range"
                min="0"
                max="1"
                step=".05"
                value={fx.delay.feedback}
                onChange={handleSetFx}
            />
            <br />
            <label>Dry</label>
            <input
                id="delay.dry"
                type="range"
                class="delaySliders"
                min="0"
                max="1"
                step=".05"
                value={fx.delay.dry}
                onChange={handleSetFx}
            />
            <br />
            <label>Wet</label>
            <input
                id="delay.wet"
                class="delaySliders"
                type="range"
                min="0"
                max="1"
                step=".05"
                value={fx.delay.wet}
                onChange={handleSetFx}
            />
        </div>
    );
};

export { Delay };
