import React from "react";

const Compressor = (props) => {
    const fx = props.fx;
    const handleSetFx = props.handleSetFx;

    return (
        <div id="compressorContainer">
            <label>Threshold</label>
            <input
                id="compressor.threshold"
                class="compressorSliders"
                type="range"
                min="-60"
                max="0"
                step="1"
                value={fx.compressor.threshold}
                onChange={handleSetFx}
            />
            <br />
            <label>Ratio</label>
            <input
                id="compressor.ratio"
                class="compressorSliders"
                type="range"
                min="1"
                max="20"
                step="1"
                value={fx.compressor.ratio}
                onChange={handleSetFx}
            />
            <br />
            <label>Attack</label>
            <input
                id="compressor.attack"
                class="compressorSliders"
                type="range"
                min="0"
                max="1"
                step=".001"
                value={fx.compressor.attack}
                onChange={handleSetFx}
            />
            <br />
            <label>Release</label>
            <input
                id="compressor.release"
                class="compressorSliders"
                type="range"
                min="0"
                max="1"
                step=".001"
                value={fx.compressor.release}
                onChange={handleSetFx}
            />
        </div>
    );

}

export { Compressor };