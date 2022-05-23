import React, { useState, useEffect } from 'react';
import Name from './Name';
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);

export default function MixCard({ song }) {
    // const {title, artist, album} = song
    const [ isHovered, setHovered] = useState(false);
    
    const handleResponse = () => {
        setHovered(!isHovered);
    }
    
    const handleClick = () =>{
        
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
                    <div onClick={handleClick} className={"musi-card-cover"} onMouseOver={handleResponse}>
                        <img src={""} alt={""}/>
                        <div className='thumbs-up'>

                        </div>
                    </div>
                    <React.Fragment>
                        <Name name={song.artist} className={"artist"} length={song.artist.length} />
                        <Name name={song.title} className={"title"} length={song.title.length} />
                        <Name name={song.album} className={"album"} length={song.album.length} />
                    </React.Fragment>
                </>
        }
    </div>
  );
}
