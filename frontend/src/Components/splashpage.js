import Image from "../Assets/Mixle_Icon-Nobg.png";
// import Speakers from "../Assets/speakers.jpg";
import "../Styles/Splash.css";

/**
 * @param {object} props 
 * @param {function} handleStartClick function from mixer/splash wrapper component 
 * @returns splash page JSX
 */
function SplashPage(props) {
  return (
    <section id="splashPageContainer">
      <div className="top_row">
        {/* <img src={Speakers} alt="speakers" /> */}
        <img src={Image} alt="logo" className="logo" />
        {/* <img src={Speakers} alt="speakers" /> */}
      </div>
      <div className="mid_row">
        <div className="records">
          <i className="fa-solid fa-compact-disc"></i>
        </div>
        <span></span>
        <div id="splashButtonContainer">
          <button id="splashButton" onClick={props.handleStartClick}>
            Start Mixing
          </button>
        </div>
        <div className="records">
          <i className="fa-solid fa-compact-disc"></i>
        </div>
      </div>
      <div className="low_row">
        <h2>Music For Everyone</h2>
      </div>
    </section>
  );
}

export { SplashPage };

// <div id="splashPageContainer">
// <link rel="preconnect" href="https://fonts.gstatic.com" />
// <link
//   href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
//   rel="stylesheet"
// />
// <div id="splashButtonContainer">
//  <button id="splashButton" onClick={props.handleStartClick}>
//    Start Mixing
//  </button>
// </div> 
// </div>