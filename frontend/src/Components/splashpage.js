
function SplashPage(props) {
  return (
    <div id="splashPageContainer">
      <h1>Splash Page</h1>
      <button onClick={props.handleStartClick}>Start Mixing</button>
    </div>
  );
}

export { SplashPage };
