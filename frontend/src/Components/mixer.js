import React, { useEffect, useState, useRef } from "react";

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
   const [playPause, setPlayPause] = useState(false);
   const [playState, setPlayState] = useState({ state: "stopped" });
   const [time, setTime] = useState({current: 0, duration: 0});
  const timer = useRef();
   // ctx = audio context element
   // track = the current audio track
   const track = useRef();
   const decodedAudio = useRef(false);
   const ctx = useRef();

   //trigger song fetch after a user interection has occurred
   useEffect(() => {
      if (!props.showSplash) {
         ctx.current = new (window.AudioContext || window.webkitAudioContext)();
         fetch(
            "http://www.shawnfaber.com/audio/01%20Packt%20Like%20Sardines%20In%20A%20Crushd%20Tin%20Box.flac"
         )
            .then(data => data.arrayBuffer())
            .then(arrayBuffer => ctx.current.decodeAudioData(arrayBuffer))
            .then(decodedAudio => createTrackNode(decodedAudio))
            .catch(err => console.log(err));
      }
   }, [props.showSplash]);

   /**
    * Creates a track node from decoded audio
    * @param {array} audio
    */
   const createTrackNode = audio => {
      if (!decodedAudio.current) decodedAudio.current = audio;
      track.current = ctx.current.createBufferSource();
      track.current.buffer = audio;
      setTime({current: 0, duration: track.current.buffer.duration});
      //ALL THE EFFECTS GO HERE
      track.current.connect(ctx.current.destination);
   };

   //handles start and stop of timer 
   const startTimer = () => {
     timer.current = setInterval(() => {
       setTime(prev => {
         return {
           ...prev,
           current: ctx.current.currentTime
         }
       });
     }, 50);
   }
   const stopTimer = () => {
     clearInterval(timer.current);
   }

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
      stopTimer();
      createTrackNode(decodedAudio.current);
   };

   return (
      <div id="mainMixerContainer">
         <h1>MIXER</h1>
         <button onClick={handlePlayPause}>
            {playPause ? "Pause" : "Play"}
         </button>
         <button onClick={handleStop}>Stop</button>
         <div>{`${time.current.toFixed(2)} / ${time.duration.toFixed(2)}`}</div>
      </div>
   );
};

export { Mixer };
