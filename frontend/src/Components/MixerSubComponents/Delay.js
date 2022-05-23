import React from "react";

const Delay = (props) => {
    const fx = props.fx;
    const handleSetFx = props.handleSetFx;

    return (
        <div id="delayContainer">
            <label>Delay Time</label>
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
            <label>{fx.delay.time * 1000}ms</label>
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
            <label>{fx.delay.feedback * 100}%</label>
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
            <label>{fx.delay.dry * 100}%</label>
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
            <label>{fx.delay.wet * 100}%</label>
        </div>
    );
};

export { Delay };
