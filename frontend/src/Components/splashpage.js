import Image from "../Assets/Mixle_Icon-Nobg.png";
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
        <img src={Image} alt="logo" className="logo" />
      </div>
      <div className="mid_row">
        <div id="splashButtonContainer">
          <button id="splashButton" onClick={props.handleStartClick}>
            Start Mixing
          </button>
        </div>
      </div>
      <div className="low_row">
        <h2>Music For Everyone</h2>
      </div>
    </section>
  );
}

export { SplashPage };