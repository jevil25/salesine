import React, { useState, useEffect, useRef } from 'react';

function Video({ id, player, playing, handleDuration, handleEnd, handleProgress, handlePlayback, states, setStates, wave }) {
  const [video, setVideo] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [fetchVideo, setFetchVideo] = useState(true);
  const [vidId, setVidId] = useState(id);
  const playerContainerRef = useRef(null);
  const iframeRef = useRef(null);
  const BACK_END_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";
  console.log("Video id is: ", id);

  useEffect(() => {
    id = id.trim().toString();
    if (id === undefined || id === null || id === "" || id === " ") {
    } else {
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
      console.log(data);
      if (data.message === "success") {
        setFetchVideo(false);
        setVideo(vidId);
      } else {
        setFetchVideo(false);
      }
    });
  }

  useEffect(() => {
    if (!fetchVideo) {
      const iframe = document.createElement('iframe');
      iframe.src = `https://drive.google.com/file/d/${id}/preview`;
      iframe.width = '100%';
      iframe.height = '100%';
      iframe.allow = 'autoplay; fullscreen';
      iframe.frameBorder = '0';
      iframe.allowFullscreen = true;
      iframe.sandbox = 'allow-scripts allow-same-origin';

      iframeRef.current = iframe;
      const playerContainer = playerContainerRef.current;
      playerContainer.innerHTML = '';
      playerContainer.appendChild(iframe);
      console.log("Iframe is: ", iframe);

      const handlePlay = () => {
        console.log("Playing");
        iframe.contentWindow.postMessage('play', '*');
        setStates({
          ...states,
          playing: true
        });
      };

      const handleSeek = (e) => {
        console.log("Seeking");
        wave.current.seekTo(e.target.currentTime);
      };

      const handlePause = () => {
        console.log("Pausing");
        iframe.contentWindow.postMessage('pause', '*');
        setStates({
          ...states,
          playing: false
        });
      };

      const handlePlaybackRateChange = () => {
        // Your logic for handling the playback rate change event goes here
        console.log("Playback rate changed");
        handlePlayback(iframeRef.current.playbackRate);
      };

      const handleDuration1 = (event) => {
        const duration = event.target.duration;
        console.log("Duration is: ", duration);
        handleDuration(duration);
      };

      const handleEnd1 = () => {
        console.log("Ended");
        handleEnd();
      };

      const handleProgress1 = () => {
        console.log("Progress");
        // Your logic for handling the progress event goes here
        handleProgress(iframeRef.current.currentTime);
      };

      iframe.addEventListener('play', handlePlay);
      iframe.addEventListener('seeked', handleSeek);
      iframe.addEventListener('pause', handlePause);
      iframe.addEventListener('ratechange', handlePlaybackRateChange);
      iframe.addEventListener('loadedmetadata', handleDuration1);
      iframe.addEventListener('ended', handleEnd1);
      iframe.addEventListener('progress', handleProgress1);

      return () => {
        iframe.removeEventListener('play', handlePlay);
        iframe.removeEventListener('seeked', handleSeek);
        iframe.removeEventListener('pause', handlePause);
        iframe.removeEventListener('ratechange', handlePlaybackRateChange);
        iframe.removeEventListener('loadedmetadata', handleDuration1);
        iframe.removeEventListener('ended', handleEnd1);
        iframe.removeEventListener('timeupdate', handleProgress1);
      };
    }
  }, [fetchVideo, id, states, setStates, wave]);

  return (
    <>
      {fetchVideo ? (
        <div>Loading...</div>
      ) : (
        <div ref={playerContainerRef} style={{ width: '100%', height: '100%' }} />
      )}
    </>
  );
}

export default Video;
