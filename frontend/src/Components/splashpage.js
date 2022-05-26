import "../Styles/Splash.css";
import "../Assets/Mixle_Icon-Nobg.png";

/**
 * @param {object} props 
 * @param {function} handleStartClick function from mixer/splash wrapper component 
 * @returns splash page JSX
 */
function SplashPage(props) {
  return (
    <div id="splashPageContainer">
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
        rel="stylesheet"
      />
    
      <div id="splashButtonContainer">
        <button id="splashButton" onClick={props.handleStartClick}>
          Start Mixing
        </button>
      </div>
    </div>
  );
}

export { SplashPage };
