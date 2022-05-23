import { useState, useEffect } from "react";
import MixCard from "./MixCard.js";
import "../Styles/scss/MixesCard.scss"
import Container from "./Container";

const API = process.env.REACT_APP_API_URL;

export default function MixesCard() {
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
    <Container>
      <div className={"music-card-container"}>
        {
          audios.map(audio => (
              <MixCard key={audio.id} audio={audio}/>
          ))
        }
      </div>
    </Container>
  );
}
