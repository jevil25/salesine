import React from 'react';
import ReactPlayer from 'react-player';

function Video({ id, player, playing, handleDuration, handleEnd, handleProgress, handlePlayback, states, setStates, wave }) {
  return (
      <>
        <ReactPlayer
          ref={player}
          url={`https://d26bootyjexpt7.cloudfront.net/${`git-meet/Product%20Marketing%20Meeting%20(weekly)%202021-06-28.mp4`}`}
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
    </>
  );
}

export default Video;
