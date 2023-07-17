

const TrimModal = () => {
    const videoRef = useRef(null);

    const playClip = () => {
        const start = 0; // Start time in seconds
        const end = 120; // End time in seconds
    
        videoRef.current.currentTime = start;
        videoRef.current.play();
    
        setTimeout(() => {
          videoRef.current.pause();
        }, (end - start) * 1000);
      };

    return (
        <ReactPlayer
            ref={videoRef}
            url={`https://d26bootyjexpt7.cloudfront.net/${`git-meet/Product%20Marketing%20Meeting%20(weekly)%202021-06-28.mp4`}`}
            width='100%'
            height='100%'
            onPlay={playClip}
        />
    )
}

export default TrimModal;