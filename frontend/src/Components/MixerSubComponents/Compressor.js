import React from "react";

/**
 * Compressor component of mixer
 * @param {object} props 
 * @param {object} fx from mixer component
 * @param {function} OnChange handler to set FX from mixer component  
 * 
 * @returns JSX for Compressor section of mixer
 */
const Compressor = (props) => {
    const fx = props.fx;
    const handleSetFx = props.handleSetFx;

    return (
        <div id="compressorContainer">
            <p id="compressorP">Compressor</p>
            <div className="compressorSliderContainer">
                <label className="compressorLabel">Threshold</label>
                <input
                    id="compressor.threshold"
                    className="compressorSliders"
                    type="range"
                    min="-60"
                    max="0"
                    step="1"
                    value={fx.compressor.threshold}
                    onChange={handleSetFx}
                />
                <label className="compressorLabel2">
                    {fx.compressor.threshold}
                </label>
            </div>
            <div className="compressorSliderContainer">
                <label>Ratio</label>
                <input
                    id="compressor.ratio"
                    className="compressorSliders"
                    type="range"
                    min="1"
                    max="20"
                    step="1"
                    value={fx.compressor.ratio}
                    onChange={handleSetFx}
                />
                <label className="compressorLabel2">
                    1:{fx.compressor.ratio}
                </label>
            </div>
            <div className="compressorSliderContainer">
                <label>Attack</label>
                <input
                    id="compressor.attack"
                    className="compressorSliders"
                    type="range"
                    min="0"
                    max="1"
                    step=".001"
                    value={fx.compressor.attack}
                    onChange={handleSetFx}
                />
                <label className="compressorLabel2">
                    {fx.compressor.attack * 1000}ms
                </label>
            </div>
            <div className="compressorSliderContainer">
                <label>Release</label>
                <input
                    id="compressor.release"
                    className="compressorSliders"
                    type="range"
                    min="0"
                    max="1"
                    step=".001"
                    value={fx.compressor.release}
                    onChange={handleSetFx}
                />
                <label className="compressorLabel2">
                    {fx.compressor.release * 1000}ms
                </label>
            </div>
        </div>
    );
};

export { Compressor };
