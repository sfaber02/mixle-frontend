import { useState } from "react";

export default function Dropdown() {
    const [drop, setDrop] = useState("dropdown-closed");

    const handleClick = (event) => {
        console.log(event.target);
        if (drop === "dropdown-closed") {
            setDrop("dropdown-open");
        } else {
            setDrop("dropdown-closed");
        }
    };
    const userId = localStorage.getItem("user_id");
    if (userId) {
        return (
            <div class="dropdown">
                <button onClick={handleClick} className="dropbtn">
                    {userId}
                    <i class="fa-solid fa-caret-down"></i>
                </button>

                <div id="myDropdown" class={drop}>
                    <a href="#home">My Mixes</a>
                    <a href="#about">View All Mixes</a>
                    <a href="#contact">Signout</a>
                </div>
            </div>
        );
    } else {
        return <></>;
    }
}
