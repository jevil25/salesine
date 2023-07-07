import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

function Video({ id,player,playing,handleDuration,handleEnd,handleProgress,handlePlayback,states,setStates,wave }) {
  const [video, setVideo] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [fetchVideo, setFetchVideo] = useState(true);
  const [vidId, setVidId] = useState(id);
  const BACK_END_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";
  console.log("Video id is: ", id);

  useEffect(() => {
    id = id.trim().toString();
    if(id === undefined || id === null || id === "" || id === " ") {
        }
        else{
            console.log("Video id is: ", id);
            console.log("Fetching video from drive");
            setVidId(id);
            getAccessToken();
        }
    }, [id]);

  function getAccessToken() {
    fetch(`${BACK_END_URL}/getVideoLink`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: vidId
      })
    }).then((res) => res.json()).then((data) => {
        console.log(data)
        if(data.message === "success") {
        setFetchVideo(false);
        setVideo(vidId);
        }
        else{
            setFetchVideo(false);
        }
    });
  }

  

  // Play the video using iframe
  return <>
    {
        fetchVideo ? 
            <div>Loading...</div> 
            : 
            <ReactPlayer
              ref={player}
              url={`https://drive.google.com/uc?export=download&id=${id}`}
              controls
              width='100%'
              muted 
              height='100%'
              playing={playing}
              onPlay = {()=>{setStates({
                ...states,
                playing:true
              })}}
              onSeek = {(e)=>{
                wave.current.seekTo(e)
              }}
              onPause = {()=>{setStates({
                ...states,
                playing:false
              })}}
              onPlaybackRateChange = {handlePlayback}
              onDuration={handleDuration}
              onEnded={handleEnd}
              onProgress={handleProgress}
            />
    }
    </>
}

export default Video;
