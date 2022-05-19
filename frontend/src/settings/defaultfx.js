const defaultfx = 
{
    speed: {
       rate: 1,
       detune: 0,
    },
    delay: {
      time: 0,
      feedback: 0,
      dry: 1,
      wet: 0,
    },
    compressor: {
      threshold: -60,
      ratio: 1,
      attack: 0,
      release: 0,
    },
    eq: {
      band1: {
        frequency: 100,
        gain: 0,
      },
      band2: {
        frequency: 500,
        gain: 0,
      },
      band3: {
        frequency: 1000,
        gain: 0,
      },
      band4: {
        frequency: 2500,
        gain: 0,
      },
      band5: {
        frequency: 8000,
        gain: 0,
      },
    },
  }

  export { defaultfx };