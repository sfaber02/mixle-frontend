import React, { useEffect, useState } from "react";

const Mixer = (props) => {
  
    useEffect(() => {
        if (!props.showSplash) {
          const ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
      }, [props.showSplash]);
  
    return (
    <div id="mainMixerContainer">
      <h1>MIXER</h1>
    </div>
  );
};

export { Mixer };
