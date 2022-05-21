import { useState, useEffect } from "react";
import Mix from "./mix.js";
import "../Styles/mix.css"

const API = process.env.REACT_APP_API_URL;

export default function Mixes() {
    const [audios, setAudios] = useState([]);
    useEffect(() => {
        fetch(`${API}/audio`)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            setAudios(data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);


  return (
    <div className="Audios">
      <section>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Artist</th>
              <th>Album</th>
              <th>Votes</th>
            </tr>
          </thead>
          <tbody>
            {audios.map((audio) => {
              return <Mix key={audio.audio_id} audio={audio} />;
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}
