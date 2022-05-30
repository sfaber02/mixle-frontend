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
                <div className="popBody">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nam accumsan velit lobortis vehicula volutpat. Nullam
                        sit amet arcu lobortis, commodo nunc a, ornare tellus.
                    </p>
                    <p>
                        Curabitur nec ligula volutpat, imperdiet lorem at,
                        tristique lacus. Aenean vehicula vel enim sit amet
                        interdum. Vivamus enim ipsum, feugiat imperdiet mauris
                        rutrum, molestie laoreet purus. Praesent efficitur sed
                        nulla eu facilisis. Maecenas hendrerit sollicitudin
                        purus at placerat.
                    </p>
                    <br />
                    <p>
                        Morbi volutpat, ante vel fringilla convallis, risus diam
                        commodo tortor, a cursus turpis elit vitae tellus. Cras
                        aliquam, diam a molestie molestie, erat diam sodales
                        nulla, placerat lobortis purus libero at ex. Sed congue
                        metus nulla, a vehicula nunc pellentesque ut. Vivamus
                        rutrum odio mauris, a convallis ligula laoreet vitae.{" "}
                    </p>
                    <br />
                    <div>
                        <p className="ghFollow">Follow Us on Github: </p>
                    </div>

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
