const defaultfx = 
{
    speed: {
       rate: .5,
       detune: 0,
    },
    delay: {
      time: 0,
      feedback: 0,
      dry: .8,
      wet: 1,
    },
    compressor: {
      threshold: -100,
      ratio: 1,
      attack: 0.02,
      release: .02,
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
        frequency: 1500,
        gain: 0,
      },
      band4: {
        frequency: 4000,
        gain: 0,
      },
      band5: {
        frequency: 8000,
        gain: 0,
      },
    },
  }

  export { defaultfx };