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
   /**
    * play/pause - boolean state for play/pause toggling
    * playstate - object state for tracking the current play state (e.g. 'playing', 'paused')
    * time - object state for current time of track / total duration of track
    * timer - ref for timer interval
    * track = ref for current audio track
    * decodedaudio = ref to store decoded audio (used to restart buffer)
    * ctx =  ref for audio context element
    */
   const [playPause, setPlayPause] = useState(false);
   const [playState, setPlayState] = useState({ state: "stopped" });
   const [time, setTime] = useState({ current: 0, duration: 0 });
   const [loading, setLoading] = useState(true);
   const timer = useRef();
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
            .then(data => {
               console.log(data.body);
               return data.arrayBuffer();
               // const reader = data.body.getReader()
               // const contentLength = data.headers.get('Content-Length');
               // const loadProgress = setInterval(async (reader, contentLength) => {
               //    const {done, value} = await reader.read();
               //    if (done) clearInterval(loadProgress);
               //    console.log (value, contentLength);
               // }, 200);
            })
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
      setTime({ current: 0, duration: track.current.buffer.duration });
      setLoading(false);
      //ALL THE EFFECTS GO HERE
      track.current.connect(ctx.current.destination);
   };

   //handles start and stop of timer
   const startTimer = () => {
      timer.current = setInterval(() => {
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
            </div>
         )}
      </>
   );
};

export { Mixer };
