import { useState, useEffect, useRef } from "react";
import MixCard from "./MixCard.js";
import "../../Styles/scss/MixesCard.scss";
import { defaultfx } from "../../settings/defaultfx.js";

const API = process.env.REACT_APP_API_URL;

export default function MixesCard() {
    /**
     * play/pause - boolean state for play/pause toggling
     * playstate - object state for tracking the current play state (e.g. 'playing', 'paused')
     * time - object state for current time of track / total duration of track
     */
    const [playPause, setPlayPause] = useState(false);
    const [playState, setPlayState] = useState({ state: "stopped" });
    const [time, setTime] = useState({ current: 0, duration: 0 });
    const [loading, setLoading] = useState(true);
    const [fx, setFx] = useState(() => defaultfx);
    const [effects, setEffects] = useState([]);

    //Refs for time display
    const timer = useRef();
    const timerStart = useRef();
    const timerOffset = useRef();
    const loadStart = useRef();
    const seekOffset = useRef(0);
    const seekTimeStamp = useRef(0);

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

    //Ref for master out
    const masterOutNode = useRef();

    /**
     * LOAD ALL MIXES
     * CREATE AUDIO NODES
     * FETCH SONG
     */
    useEffect(() => {
        fetch(`${API}/effects/allusers/1`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setEffects(data);
            })
            .catch((err) => {
                console.log(err);
            });

        //Create audio context
        ctx.current = new (window.AudioContext || window.webkitAudioContext)();

        loadStart.current = Date.now();

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

        // Create Master Out Node
        masterOutNode.current = ctx.current.createGain();

        //Fetch Song from Server and decode audio for playback
        fetch(process.env.REACT_APP_SONG_URL)
            .then((data) => {
                // console.log(data);
                return data.arrayBuffer();
            })
            .then((arrayBuffer) => {
                // console.log(arrayBuffer);
                return ctx.current.decodeAudioData(arrayBuffer);
            })
            .then((decodedAudio) => {
                timerOffset.current = (Date.now() - loadStart.current) / 1000;
                // console.log(timerOffset.current);
                createTrackNode(decodedAudio);
            })
            .catch((err) => console.log(err));
    }, []);

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
        analyserNode.current.connect(masterOutNode.current);

        //Master Out Node
        masterOutNode.current.connect(ctx.current.destination);
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

            //Set compressor settings
            compressorNode.current.threshold.value = fx.compressor.threshold;
            compressorNode.current.ratio.value = fx.compressor.ratio;
            compressorNode.current.attack.value = fx.compressor.attack;
            compressorNode.current.release.value = fx.compressor.release;
        }
    }, [loading, fx]);

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

    //handles start and stop of timer
    const startTimer = () => {
        timerStart.current = Date.now();
        timer.current = setInterval(() => {
            setTime((prev) => {
                return {
                    ...prev,
                    current:
                        seekOffset.current > 0
                            ? seekOffset.current +
                              (ctx.current.currentTime - seekTimeStamp.current)
                            : ctx.current.currentTime -
                              (timerStart.current - loadStart.current) / 1000 +
                              seekOffset.current,
                };
            });
        }, 50);
    };
    const stopTimer = () => {
        clearInterval(timer.current);
    };

    const handleUserChange = (user) => {
      console.log(user);
      for (let mix of effects) {
        console.log (mix.user_id);
        if (mix.user_id == user) {

          console.log(mix.effects_data);
          setFx(mix.effects_data);
        }
      }
    };

    return (
        <div id="mixesContainer">
            <div id="transportControlsContainer">
                {!loading && <button onClick={handlePlayPause}>
                    {playPause ? (
                        <i className="fa-solid fa-pause"></i>
                    ) : (
                        <i className="fa-solid fa-play"></i>
                    )}
                </button>}
            </div>
            <div className={"music-card-container"}>
                {effects.map((effect) => (
                    <MixCard key={effect.id} effect={effect} handleUserChange={handleUserChange} />
                ))}
            </div>
        </div>
    );
}
