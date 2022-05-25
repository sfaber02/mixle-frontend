import "../Styles/Splash.css";
import "../Assets/Mixle_Icon-Nobg.png";

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
