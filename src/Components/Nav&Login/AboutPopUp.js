import "../../Styles/PopUp.css";

/**
 *
 * @param {Object} props - props object containing trigger(boolean) and setTrigger(function) to control information icon on navBar
 * @returns JSX for popup functionality in navBar icon
 */
export default function AboutPopUp(props) {
    // updating state in parent component
    const handleClick = () => {
        props.setTrigger(!props.trigger);
    };

    return props.trigger ? (
        <div className="popup">
            <div className="popup-inner">
                <div className="popHeader">
                    <h3>About</h3>
                    <button className="closeBtn" onClick={handleClick}>
                        <i className="fa-regular fa-circle-xmark fa-xl"></i>{" "}
                    </button>
                </div>
                <br />
                <div className="popBody">
                    <p>
                        Mixle is an audio manipulation game. A random song is
                        picked each day and users are able to create a mix using
                        various audio effects.
                    </p>
                    <br />
                    <p>
                        Once a mix is complete the user can submit their mix for
                        the world to hear. Listen to and vote on other users
                        mixes in the "Mixes" section.
                    </p>
                    <br />
                    <p>
                        All users are given 3 votes to vote on their favorite
                        mixes. May the best mix win!{" "}
                    </p>
                    <br />
                    <div>
                        <p className="ghFollow">Follow Us on Github: </p>
                    </div>
                    <br />
                    <ul>
                        <li>
                            <i className="fa-brands fa-github-alt"></i>
                            <a href="https://github.com/HectorIlarraza">
                                Hector Ilarraza
                            </a>
                        </li>
                        <li>
                            <i className="fa-brands fa-github-alt"></i>
                            <a href="https://github.com/jrussell1017">
                                James Russell
                            </a>
                        </li>
                        <li>
                            <i className="fa-brands fa-github-alt"></i>
                            <a href="https://github.com/joshmarte">
                                Josh Marte
                            </a>
                        </li>
                        <li>
                            <i className="fa-brands fa-github-alt"></i>
                            <a href="https://github.com/sfaber02">
                                Shawn Faber
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    ) : (
        ""
    );
}
