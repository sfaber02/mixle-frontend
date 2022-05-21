import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { defaultfx } from "../settings/defaultfx";
// import {}
import "../Styles/mixer.css";

//MIXER SUB COMPONENTS
import { Visualizer } from "./MixerSubComponents/Visualizer";
import { Delay } from "./MixerSubComponents/Delay";
import { PlaySpeed } from "./MixerSubComponents/PlaySpeed";
import { Compressor } from "./MixerSubComponents/Compressor";
import { Eq } from "./MixerSubComponents/Eq";


const API = process.env.REACT_APP_API_URL;

/**
 * TO DO:
 * Seek bar
 * Make current track time display
 *
 *
 * @param {object} props
 */
const Mixer = (props) => {
    const navigate = useNavigate();

    /**
     * play/pause - boolean state for play/pause toggling
     * playstate - object state for tracking the current play state (e.g. 'playing', 'paused')
     * time - object state for current time of track / total duration of track
     */
    const [playPause, setPlayPause] = useState(false);
    const [playState, setPlayState] = useState({ state: "stopped" });
    const [time, setTime] = useState({ current: 0, duration: 0 });

    const [loading, setLoading] = useState(true);
    const [firstLoad, setFirstLoad] = useState(true);
    const [fx, setFx] = useState(defaultfx);

    //Refs for time display
    const timer = useRef();
    const timeStart = useRef();

    //Refs for audio node and decoded audio array
    const track = useRef();
    const decodedAudio = useRef(false);

    //Refs for context elements
    const ctx = useRef();

    //Refs for delay nodes
    const delayNode = useRef();
    const feedbackNode = useRef();
    const dryNode = useRef();
    const wetNode = useRef();
    const delayOutNode = useRef();

    //Refs for EQ nodes
    const band1 = useRef();
    const band2 = useRef();
    const band3 = useRef();
    const band4 = useRef();
    const band5 = useRef();

    //Ref for Compressor node
    const compressorNode = useRef();

    //Ref for analyser node
    const analyserNode = useRef();

    useEffect(() => {
        const storedFx = JSON.parse(localStorage.getItem("temp_fx"));
        if (storedFx) {
            setFx(storedFx);
            localStorage.setItem("temp_fx", null);
        }
    }, []);

    //trigger song fetch after a user interaction has occurred
    useEffect(() => {
        if (!props.showSplash) {
            //Create audio context
            ctx.current = new (window.AudioContext ||
                window.webkitAudioContext)();

            //Create Delay Nodes
            delayNode.current = ctx.current.createDelay();
            feedbackNode.current = ctx.current.createGain();
            dryNode.current = ctx.current.createGain();
            wetNode.current = ctx.current.createGain();
            delayOutNode.current = ctx.current.createGain();

            // //Create Analyser Node
            analyserNode.current = ctx.current.createAnalyser();

            // //Create Filter Nodes
            band1.current = ctx.current.createBiquadFilter();
            band2.current = ctx.current.createBiquadFilter();
            band3.current = ctx.current.createBiquadFilter();
            band4.current = ctx.current.createBiquadFilter();
            band5.current = ctx.current.createBiquadFilter();

            // Changing default filters
            band1.current.type = "lowshelf";
            band2.current.type = "peaking";
            band3.current.type = "peaking";
            band4.current.type = "peaking";
            band5.current.type = "highshelf";

            // //Create Compressor Node
            compressorNode.current = ctx.current.createDynamicsCompressor();

            //Fetch Song from Server and decode audio for playback
            fetch(
                "http://www.shawnfaber.com/audio/1987%20-%20Drumming%20-%2004%20-%20part%20IV.mp3"
            )
                .then((data) => {
                    // console.log(data);
                    return data.arrayBuffer();
                })
                .then((arrayBuffer) => {
                    // console.log(arrayBuffer);
                    return ctx.current.decodeAudioData(arrayBuffer);
                })
                .then((decodedAudio) => {
                    // console.log(decodedAudio);
                    createTrackNode(decodedAudio);
                })
                .catch((err) => console.log(err));
        }
    }, [props.showSplash]);

    /**
     * Creates a track node from decoded audio
     * @param {array} audio - decoded audio from fetch
     */
    const createTrackNode = (audio) => {
        //store decoded audio in ref for future use
        if (!decodedAudio.current) decodedAudio.current = audio;

        //create a new audio source from decoded audio
        track.current = ctx.current.createBufferSource();
        track.current.buffer = decodedAudio.current;

        //intialize time state, set loading state
        setTime({ current: 0, duration: track.current.buffer.duration });
        setLoading(false);

        connectNodes();
    };

    const connectNodes = () => {
        // delay path dry signal
        track.current.connect(dryNode.current);
        dryNode.current.connect(delayOutNode.current);

        //delay path wet signal
        track.current.connect(delayNode.current);
        delayNode.current.connect(feedbackNode.current);
        feedbackNode.current.connect(delayNode.current);
        delayNode.current.connect(wetNode.current);
        wetNode.current.connect(delayOutNode.current);

        //delay output
        delayOutNode.current.connect(band1.current);
        band1.current.connect(band2.current);
        band2.current.connect(band3.current);
        band3.current.connect(band4.current);
        band4.current.connect(band5.current);
        band5.current.connect(compressorNode.current);

        //compressor path
        compressorNode.current.connect(analyserNode.current);

        //analyser path
        analyserNode.current.connect(ctx.current.destination);
    };

    //SET FX settings
    useEffect(() => {
        if (!loading) {
            //Set play speed
            track.current.playbackRate.value = fx.speed.rate;
            track.current.detune.value = fx.speed.detune;

            //Set Delay settings
            delayNode.current.delayTime.value = fx.delay.time;
            feedbackNode.current.gain.value = fx.delay.feedback;
            dryNode.current.gain.value = fx.delay.dry;
            wetNode.current.gain.value = fx.delay.wet;

            // SET EQ settings
            band1.current.frequency.value = fx.eq.band1.frequency;
            band2.current.frequency.value = fx.eq.band2.frequency;
            band3.current.frequency.value = fx.eq.band3.frequency;
            band4.current.frequency.value = fx.eq.band4.frequency;
            band5.current.frequency.value = fx.eq.band5.frequency;

            band1.current.gain.value = fx.eq.band1.gain;
            band2.current.gain.value = fx.eq.band2.gain;
            band3.current.gain.value = fx.eq.band3.gain;
            band4.current.gain.value = fx.eq.band4.gain;
            band5.current.gain.value = fx.eq.band5.gain;

            //Analyzer Node Settings
            // analyserNode.current.fftSize = 32768;

            //Set compressor settings
            compressorNode.current.threshold.value = fx.compressor.threshold;
            compressorNode.current.ratio.value = fx.compressor.ratio;
            compressorNode.current.attack.value = fx.compressor.attack;
            compressorNode.current.release.value = fx.compressor.release;

            setFirstLoad(false);
        }
    }, [loading, fx]);

    // CHANGE FX SETTINGS HANDLERS
    const handleSetFx = (e) => {
        setFx((prev) => {
            if (e.target.id.split(".").length === 3) {
                return {
                    ...prev,
                    [e.target.id.split(".")[0]]: {
                        ...prev[e.target.id.split(".")[0]],
                        [e.target.id.split(".")[1]]: {
                            ...prev.eq[e.target.id.split(".")[1]],
                            [e.target.id.split(".")[2]]: e.target.value,
                        },
                    },
                };
            } else {
                return {
                    ...prev,
                    [e.target.id.split(".")[0]]: {
                        ...prev[e.target.id.split(".")[0]],
                        [e.target.id.split(".")[1]]: e.target.value,
                    },
                };
            }
        });
    };

    //handles start and stop of timer
    const startTimer = () => {
        timer.current = setInterval(() => {
            //  console.log(ctx.current.currentTime);
            setTime((prev) => {
                return {
                    ...prev,
                    current: ctx.current.currentTime,
                };
            });
        }, 50);
    };
    const stopTimer = () => {
        clearInterval(timer.current);
    };

    //Transport control click handlers
    const handlePlayPause = () => {
        if (playState.state === "stopped") {
            track.current.start(ctx.current.currentTime);
            startTimer();
            setPlayState({ state: "playing" });
        } else if (playState.state === "playing") {
            ctx.current.suspend();
            setPlayState({ state: "paused" });
        } else if (playState.state === "paused") {
            ctx.current.resume();
            setPlayState({ state: "playing" });
        }
        setPlayPause((prev) => !prev);
    };

    const handleStop = () => {
        track.current.stop(0);
        setPlayState({ state: "stopped" });
        setPlayPause(false);
        setTime((p) => {
            return {
                ...p,
                current: 0,
            };
        });
        stopTimer();
        createTrackNode(decodedAudio.current);
    };

    //Save click handler
    const handleSaveClick = async () => {
        let user = JSON.parse(localStorage.getItem("user_id"));
        if (user) {
            try {
                const data = {
                    effects: JSON.stringify(fx),
                    user_id: user,
                    audio_id: 1,
                };
                const response = await fetch(`${API}/effects`, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
                const content = await response.json();
                localStorage.setItem(
                    "user_id",
                    JSON.stringify(content.userInfo.user_id)
                );
                return navigate("/");
            } catch (error) {
                return error;
            }
        } else {
            localStorage.setItem("temp_fx", JSON.stringify(fx));
            navigate("/register");
        }
    };

    const clearUser = () => {
        localStorage.setItem("user_id", null);
        localStorage.setItem("temp_fx", null);
    };

    return (
        <>
            {loading && <h1>Loading Please Wait...</h1>}
            {!loading && (
                <div id="mainMixerContainer">
                    <Visualizer analyserNode={analyserNode.current} />
                    <div id="transportContainer">
                        <button onClick={handlePlayPause}>
                            {playPause ? "Pause" : "Play"}
                        </button>
                        <button onClick={handleStop}>Stop</button>
                        <button onClick={handleSaveClick}>Save Mix</button>
                        <button onClick={clearUser}>Clear User</button>
                        <div>{`${time.current.toFixed(
                            2
                        )} / ${time.duration.toFixed(2)}`}</div>
                        <input
                            class="transportSlider"
                            type="range"
                            min="0"
                            max={time.duration}
                            step="1"
                            value={time.current}
                        />
                    </div>
                    <Delay handleSetFx={handleSetFx} fx={fx} />
                    <PlaySpeed handleSetFx={handleSetFx} fx={fx} />
                    <Compressor handleSetFx={handleSetFx} fx={fx} />
                    <Eq handleSetFx={handleSetFx} fx={fx} />
                </div>
            )}
        </>
    );
};

export { Mixer };
