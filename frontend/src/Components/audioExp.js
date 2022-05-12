import { useEffect, useState } from "react";

export default function AudioExp() {
    const [song, setSong] = useState({});
    useEffect(() => {
        fetch()
            .then((r) => {
                setSong(r);
            })
            .then((r) => {
                console.log(song);
            });
    }, []);
    // const ctx = new (window.AudioContext || window.webkitAudioContext)();

    // const audioElement = document.createElement("audio");
    // audioElement.setAttribute("id", "audio1");
    // audioElement.setAttribute(
    //     "src",
    //     "https://drive.google.com/uc?authuser=0&id=1_Cs87L92w3QHz0Exif481eKbflN5kleW&export=download"
    // );
    // audioElement.setAttribute("controls", true);

    // const mediaElement = ctx.createMediaElementSource(audioElement);
    // console.log(mediaElement);
    // console.log(audioElement);
    return (
        <div>
            <button
                onClick={() => {
                    setSong({ true: true });
                }}
            >
                Play
            </button>
        </div>
    );
}
