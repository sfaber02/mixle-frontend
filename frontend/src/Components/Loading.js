import { useEffect } from "react";
import "../Styles/Loading.css";

/**
 * Animates loading dots using interval function
 * @param {Object} element - html element (div) which constains dot elements
 * @param {string} className - className of html element to add to container
 */
function animate(element, className) {
    element.classList.add(className);
    setTimeout(() => {
        element.classList.remove(className);
        setTimeout(() => {
            animate(element, className);
        }, 500);
    }, 2500);
}

export default function Loading() {
    // Component did mount wrapper to grab div for loading animation
    useEffect(() => {
        let dots = document.querySelector(".dots");
        animate(dots, "dots--animate");
    });

    return (
        <div className="loading">
            <h1>
                Loading
                <div className="dots">
                    <span className="dot z"></span>
                    <span className="dot f"></span>
                    <span className="dot s"></span>
                    <span className="dot t">
                        <span className="dot l"></span>
                    </span>
                </div>
            </h1>
        </div>
    );
}
