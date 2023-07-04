import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Video({ id }) {
  const [video, setVideo] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [fetchVideo, setFetchVideo] = useState(true);
  const [vidId, setVidId] = useState(id);
  const BACK_END_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

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
            <iframe src={`https://drive.google.com/file/d/${id}/preview`} width="640" height="480"></iframe>
    }
    </>
}

export default Video;
