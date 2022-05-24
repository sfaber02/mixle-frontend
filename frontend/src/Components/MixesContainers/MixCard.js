import React, { useState, useEffect } from 'react';
import "../../Styles/scss/MixCard.scss";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import Name from './Name';
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

export default function MixCard({ audio }) {

    const [ isHovered, setHovered] = useState(false);
    
    const handleResponse = () => {
        setHovered(!isHovered);
    }
    
    const handleClick = () =>{
        console.log("trigger");
    }
    
    const [ loaded, setLoaded] = useState(false);
    
    useEffect(() => {
        setLoaded(true)
    }, [])

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
                    <div onClick={handleClick} className={"music-card-cover"} onMouseOver={handleResponse}>
                        <img src={"https://i.ytimg.com/vi/pLqipJNItIo/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLBkklsyaw9FxDmMKapyBYCn9tbPNQ"} alt={""}/>
                        <div className='thumbs-up'>
                            <ThumbUpAltIcon />
                        </div>
                    </div>
                    <div>
                        <Name name={audio.artist} className={"artist"} length={audio.artist.length} />
                        <Name name={audio.title} className={"title"} length={audio.title.length} />
                        <Name name={audio.album} className={"album"} length={audio.album.length} />
                    </div>
                </>
        }
    </div>
  );
}
