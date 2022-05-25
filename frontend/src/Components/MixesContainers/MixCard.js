import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../Styles/scss/MixCard.scss";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import Name from './Name';
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import artDB from "../../Actions/art";



const API = process.env.REACT_APP_API_URL;

export default function MixCard({ effect, handleUserChange }) {
    const [ isHovered, setHovered] = useState(false);
    const [userVotes, setUserVotes] = useState();
    const [imageSource, setImageSource] = useState(artDB[Math.floor(Math.random() * artDB.length)]); 

    const navigate = useNavigate();

    const handleResponse = () => {
        setHovered(!isHovered);
    }
    
    const handleClick = () =>{
        let user = JSON.parse(localStorage.getItem("user_id"));
        if (user) {
            console.log (user);
        } else {
          navigate("/register");  
        }
    }
    
    const [ loaded, setLoaded] = useState(false);
    
    useEffect(() => {
        setLoaded(true);
    }, [])
    
    const handleMouseEnter = (e) => {
        handleUserChange(e.target.parentNode.id);
    }
    
  return (
    <div className={"music-card"}>
        {
            !loaded ?
            <div className={"Skeleton-top"}>
                <Skeleton variant="rect" width={210} height={210} />
                <Box pt={0.5}>
                    <Skeleton />
                    <Skeleton width="60%" />
                </Box>
            </div>
                :
                <>
                    <div id={effect.user_id} onClick={handleClick} className={"music-card-cover"} onMouseOver={handleResponse} onMouseEnter={handleMouseEnter}>
                        <img src={imageSource} alt={"mixelArt"}/>
                        <div className='thumbs-up'>
                            <ThumbUpAltIcon />
                        </div>
                    </div>
                    <div>
                        <Name name={effect.username} className={"username"} />
                    </div>
                </>
        }
    </div>
  );
}
