import { useState, useEffect } from "react";
import MixCard from "./MixCard.js";
import "../../Styles/scss/MixesCard.scss"
import Container from "./Container";

const API = process.env.REACT_APP_API_URL;

export default function MixesCard() {
    const [effects, setEffects] = useState([]);
    
    useEffect(() => {
        fetch(`${API}/effects/allmixes/1`)
        .then((res) => {
          return res.json()
        })
        .then((data) => {
          console.log(data);
            setEffects(data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);


  return (
    <Container>
      <div className={"music-card-container"}>
        {
          // effects.map( => (
          //     <MixCard key={audio.id} audio={audio}/>
          // ))
        }
      </div>
    </Container>
  );
}
