import React, { useEffect, useState, useRef } from "react";





/**
 * TO DO:
 * Need to add loading progress and have buttons be disabled until song is loaded
 * Seek bar
 * Make current track time display
 * 
 * 
 * @param {*} props 
 * @returns 
 */
const Mixer = props => {
  const [playPause, setPlayPause] = useState(false);
  const [playState, setPlayState] = useState({ state: 'stopped' });


  // ctx = audio context element
// track = the current audio track
  const track = useRef();
  const decodedAudio = useRef(false);
  const ctx = useRef();

   //trigger song fetch after a user interection has occurred
   useEffect(() => {;
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

   // 
   const createTrackNode = audio => {
      if (!decodedAudio.current) decodedAudio.current = audio;
      track.current = ctx.current.createBufferSource();
      track.current.buffer = audio;
      //ALL THE EFFECTS GO HERE
      track.current.connect(ctx.current.destination);
      // track.current.start(ctx.current.currentTime);
   };

   //Transport control click handlers
   
   const handlePlayPause = () => {
    if (playState.state === 'stopped') {
      track.current.start(ctx.current.currentTime);
      setPlayState({state: 'playing'});
    } else if (playState.state === 'playing') {
      ctx.current.suspend();
      setPlayState({state: 'paused'});
    } else if (playState.state === 'paused') {
      ctx.current.resume();
      setPlayState({state: 'playing'});
    }


    setPlayPause(prev => !prev);
   } 


   const handleStop = () => {
    track.current.stop(0);
    setPlayState({state: 'stopped'});
    setPlayPause(false);
    createTrackNode(decodedAudio.current);
   }



   return (
      <div id="mainMixerContainer">
         <h1>MIXER</h1>
         {/* <button onClick={handlePlay}>Play</button> */}
         <button onClick={handlePlayPause}>{playPause ? "Pause" : "Play"}</button>
         <button onClick={handleStop}>Stop</button>
      </div>
   );
};

export { Mixer };
