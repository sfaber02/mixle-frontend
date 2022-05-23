import "../Styles/Splash.css";

function SplashPage(props) {
  return (
    <div id="splashPageContainer">
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
        rel="stylesheet"
      />
      {/* <h1>Splash Page</h1> */}
      <div>
        <button id="splashButton" onClick={props.handleStartClick}>
          Start Mixing
        </button>
      </div>
    </div>
  );
}

export { SplashPage };
