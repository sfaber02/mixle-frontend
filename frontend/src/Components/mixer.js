import React, { useEffect, useState, useRef } from "react";
import { defaultfx } from "../settings/defaultfx";
/**
 * TO DO:
 * Need to add loading progress and have buttons be disabled until song is loaded
 * Seek bar
 * Make current track time display
 *
 *
 * @param {object} props
 */
const Mixer = props => {
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
   const canvasCtx = useRef();

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

   //trigger song fetch after a user interaction has occurred
   useEffect(() => {
      if (!props.showSplash) {
         //Create audio context and canvas context
         ctx.current = new (window.AudioContext || window.webkitAudioContext)();
         timeStart.current = Date.now();

         //Create Delay Nodes
         delayNode.current = ctx.current.createDelay();
         feedbackNode.current = ctx.current.createGain();
         dryNode.current = ctx.current.createGain();
         wetNode.current = ctx.current.createGain();
         delayOutNode.current = ctx.current.createGain();

         // //Create Analyser Node
         // const analyser = ctx.createAnalyser();

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
            "http://www.shawnfaber.com/audio/01%20-%20Metronomic%20Underground%20-%20USEE19694710%20-%20355425551.flac"
         )
            .then(data => {
               console.log(data);
               return data.arrayBuffer();
            })
            .then(arrayBuffer => {
               console.log(arrayBuffer);
               return ctx.current.decodeAudioData(arrayBuffer);
            })
            .then(decodedAudio => {
               console.log(decodedAudio);
               createTrackNode(decodedAudio);
            })
            .catch(err => console.log(err));
      }
   }, [props.showSplash]);

   /**
    * Creates a track node from decoded audio
    * @param {array} audio - decoded audio from fetch
    */
   const createTrackNode = audio => {
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
      compressorNode.current.connect(ctx.current.destination);
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
   }, [loading, firstLoad, fx]);

   // CHANGE FX SETTINGS HANDLERS
   const setDelayFx = e => {
      setFx(prev => {
         return {
            ...prev,
            delay: {
               ...prev.delay,
               [e.target.id]: e.target.value,
            },
         };
      });
   };

   const setSpeedFx = e => {
      setFx(prev => {
         return {
            ...prev,
            speed: {
               ...prev.speed,
               [e.target.id]: e.target.value,
            },
         };
      });
   };

   const setCompressorFx = e => {
      setFx(prev => {
         return {
            ...prev,
            compressor: {
               ...prev.compressor,
               [e.target.id]: e.target.value,
            },
         };
      });
   };

   const setEqFx = e => {
      setFx(prev => {
         return {
            ...prev,
            eq: {
               ...prev.eq,
               [e.target.id.split(".")[0]]: {
                  ...prev.eq[e.target.id.split(".")[0]],
                  [e.target.id.split(".")[1]]: e.target.value,
               },
            },
         };
      });
   };

   //handles start and stop of timer
   const startTimer = () => {
      timer.current = setInterval(() => {
        //  console.log(ctx.current.currentTime);
         setTime(prev => {
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
      setPlayPause(prev => !prev);
   };

   const handleStop = () => {
      track.current.stop(0);
      setPlayState({ state: "stopped" });
      setPlayPause(false);
      setTime(p => {
         return {
            ...p,
            current: 0,
         };
      });
      stopTimer();
      createTrackNode(decodedAudio.current);
   };

   return (
      <>
         {loading && <h1>Loading Please Wait...</h1>}
         {!loading && (
            <div id="mainMixerContainer">
               <h1>MIXER</h1>
               <button onClick={handlePlayPause}>
                  {playPause ? "Pause" : "Play"}
               </button>
               <button onClick={handleStop}>Stop</button>
               <div>{`${time.current.toFixed(2)} / ${time.duration.toFixed(
                  2
               )}`}</div>
               <input
                  type="range"
                  min="0"
                  max={time.duration}
                  step="1"
                  value={time.current}
               />
               <br />
               <div id="delayContainer">
                  <label>Delay Time {fx.delay.time * 1000}ms</label>
                  <input
                     id="time"
                     type="range"
                     min="0"
                     max="1"
                     step=".01"
                     value={fx.delay.time}
                     onChange={setDelayFx}
                  />
                  <br />
                  <label>Feedback</label>
                  <input
                     id="feedback"
                     type="range"
                     min="0"
                     max="1"
                     step=".05"
                     value={fx.delay.feedback}
                     onChange={setDelayFx}
                  />
                  <br />
                  <label>Dry</label>
                  <input
                     id="dry"
                     type="range"
                     min="0"
                     max="1"
                     step=".05"
                     value={fx.delay.dry}
                     onChange={setDelayFx}
                  />
                  <br />
                  <label>Wet</label>
                  <input
                     id="wet"
                     type="range"
                     min="0"
                     max="1"
                     step=".05"
                     value={fx.delay.wet}
                     onChange={setDelayFx}
                  />
               </div>
               <div id="playSpeedContainer">
                  <label>Speed</label>
                  <input
                     id="rate"
                     type="range"
                     min=".1"
                     max="4"
                     step=".1"
                     value={fx.speed.rate}
                     onChange={setSpeedFx}
                  />
                  <br />
                  <label>Detune</label>
                  <input
                     id="detune"
                     type="range"
                     min="-2400"
                     max="2400"
                     step="100"
                     value={fx.speed.detune}
                     onChange={setSpeedFx}
                  />
               </div>
               <br />
               <div id="compressorContainer">
                  <label>Threshold</label>
                  <input
                     id="threshold"
                     type="range"
                     min="-60"
                     max="0"
                     step="1"
                     value={fx.compressor.threshold}
                     onChange={setCompressorFx}
                  />
                  <br />
                  <label>Ratio</label>
                  <input
                     id="ratio"
                     type="range"
                     min="1"
                     max="20"
                     step="1"
                     value={fx.compressor.ratio}
                     onChange={setCompressorFx}
                  />
                  <br />
                  <label>Attack</label>
                  <input
                     id="attack"
                     type="range"
                     min="0"
                     max="1"
                     step=".001"
                     value={fx.compressor.attack}
                     onChange={setCompressorFx}
                  />
                  <br />
                  <label>Release</label>
                  <input
                     id="release"
                     type="range"
                     min="0"
                     max="1"
                     step=".001"
                     value={fx.compressor.release}
                     onChange={setCompressorFx}
                  />
               </div>
               <div id="eqContainer">
                  <div id="eqBand1">
                     <label>{fx.eq.band1.frequency}hz</label>
                     <input
                        id="band1.frequency"
                        type="range"
                        min="20"
                        max="500"
                        step="10"
                        value={fx.eq.band1.frequency}
                        onChange={setEqFx}
                     />
                     <label>{fx.eq.band1.gain}db</label>
                     <input
                        id="band1.gain"
                        type="range"
                        min="-30"
                        max="30"
                        step="1"
                        value={fx.eq.band1.gain}
                        onChange={setEqFx}
                     />
                  </div>
                  <div id="eqBand2">
                     <label>{fx.eq.band2.frequency}hz</label>
                     <input
                        id="band2.frequency"
                        type="range"
                        min="100"
                        max="700"
                        step="10"
                        value={fx.eq.band2.frequency}
                        onChange={setEqFx}
                     />
                     <label>{fx.eq.band2.gain}db</label>
                     <input
                        id="band2.gain"
                        type="range"
                        min="-30"
                        max="30"
                        step="1"
                        value={fx.eq.band2.gain}
                        onChange={setEqFx}
                     />
                  </div>
                  <div id="eqBand3">
                     <label>{fx.eq.band3.frequency}hz</label>
                     <input
                        id="band3.frequency"
                        type="range"
                        min="600"
                        max="1500"
                        step="10"
                        value={fx.eq.band3.frequency}
                        onChange={setEqFx}
                     />
                     <label>{fx.eq.band3.gain}db</label>
                     <input
                        id="band3.gain"
                        type="range"
                        min="-30"
                        max="30"
                        step="1"
                        value={fx.eq.band3.gain}
                        onChange={setEqFx}
                     />
                  </div>
                  <div id="eqBand4">
                     <label>{fx.eq.band4.frequency}hz</label>
                     <input
                        id="band4.frequency"
                        type="range"
                        min="1500"
                        max="5000"
                        step="10"
                        value={fx.eq.band4.frequency}
                        onChange={setEqFx}
                     />
                     <label>{fx.eq.band4.gain}db</label>
                     <input
                        id="band4.gain"
                        type="range"
                        min="-30"
                        max="30"
                        step="1"
                        value={fx.eq.band4.gain}
                        onChange={setEqFx}
                     />
                  </div>
                  <div id="eqBand5">
                     <label>{fx.eq.band5.frequency}hz</label>
                     <input
                        id="band5.frequency"
                        type="range"
                        min="4000"
                        max="10000"
                        step="10"
                        value={fx.eq.band5.frequency}
                        onChange={setEqFx}
                     />
                     <label>{fx.eq.band5.gain}db</label>
                     <input
                        id="band5.gain"
                        type="range"
                        min="-30"
                        max="30"
                        step="1"
                        value={fx.eq.band5.gain}
                        onChange={setEqFx}
                     />
                  </div>
               </div>
            </div>
         )}
      </>
   );
};

export { Mixer };
