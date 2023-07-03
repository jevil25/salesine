import React, { useState } from 'react';
import axios from 'axios';


function Video({ id }) {
    console.log(id);
    const [video, setVideo] = useState(null);
    const [accessToken, setAccessToken] = useState("");
    const BACK_END_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000" ;
    fetch(`${BACK_END_URL}/googleAccessToken`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            },
        body: JSON.stringify({
            email: process.env.NEXT_PUBLIC_EMAIL,
        })
    }).then((res) => res.json()).then((data) => {
        setAccessToken(data.googleAccessToken);
        getVideo();
    });
    function getVideo(){
    console.log("Fetching video from drive");
      axios({
        method: 'GET',
        url: `https://www.googleapis.com/drive/v3/files/${id}?alt=media`,
        responseType: 'arraybuffer',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      }).then((response) => {
        console.log(response);
        //play the array buffer video using blob
        const blob = new Blob([response.data], { type: 'video/mp4' });
        const videoURL = window.URL.createObjectURL(blob);
        setVideo(videoURL);
        }).catch((error) => {
            console.log(error);
      }
    );
}
    //play the video using iframe
    return (
        <div>
            <iframe src={video} width="640" height="480" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen></iframe>
        </div>
    )
}

export default Video