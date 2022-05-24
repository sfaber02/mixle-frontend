import React, { useRef, useEffect } from "react";

/**
 * Renders music visualizer baseed on audio date form analyser node
 * needs analyser node passed as a prop
 * @param {object} props
 * @returns visualizer component
 */
const Visualizer = (props) => {
    // Refs for canvas context element and analyser node
    const canvasCtx = useRef();
    const analyserNode = useRef(props.analyserNode);

    useEffect(() => {
        const canvas = document.getElementById("visualizer");
        const wrapper = canvas.parentNode;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight / 3;
        

        window.onresize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight / 3;
        };

        canvasCtx.current = canvas.getContext("2d");

        analyserNode.current.fftSize = 4096;
        let bufferLength = analyserNode.current.frequencyBinCount;
        let dataArray = new Uint8Array(bufferLength);
        let barHeight;
        let x = 0;

        //Render visualizer
        const renderFrame = () => {
            const barWidth = (canvas.width / bufferLength) * 13;
            // console.log (canvas.width, canvas.height);
            requestAnimationFrame(renderFrame);
            x = 0;
            // console.log (analyserNode.current);

            analyserNode.current.getByteFrequencyData(dataArray);

            canvasCtx.current.fillStyle = "rgba(72,61,139,.2)"; // Clears canvas before rendering bars (black with opacity 0.2)
            canvasCtx.current.fillRect(0, 0, canvas.width, canvas.height); // Fade effect, set opacity to 1 for sharper rendering of bars

            let r, g, b;
            let bars = 100;

            for (let i = 0; i < bars; i++) {
                barHeight = dataArray[i];
                // console.log (dataArray[i]);
                if (dataArray[i] > 210) {
                    // pink
                    r = 250;
                    g = 0;
                    b = 255;
                } else if (dataArray[i] > 200) {
                    // yellow
                    r = 250;
                    g = 255;
                    b = 0;
                } else if (dataArray[i] > 190) {
                    // yellow/green
                    r = 204;
                    g = 255;
                    b = 0;
                } else if (dataArray[i] > 180) {
                    // blue/green
                    r = 0;
                    g = 219;
                    b = 131;
                } else {
                    // light blue
                    r = 0;
                    g = 199;
                    b = 255;
                }

                canvasCtx.current.fillStyle = `rgb(${r},${g},${b})`;
                canvasCtx.current.fillRect(
                    x,
                    canvas.height - barHeight,
                    barWidth,
                    barHeight
                );

                x += barWidth + 5;
            }
        };
        renderFrame();
    }, []);

    return (
        <div id="visualizerContainer">
            <canvas id="visualizer"></canvas>
        </div>
    );
};

export { Visualizer };
