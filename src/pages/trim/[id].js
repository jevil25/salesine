import { useRouter } from 'next/router';
import { useEffect,useState,useRef } from 'react';
import Navbar from '../../components/Navbar';
import ReactPlayer from 'react-player';
import styles from "../../styles/Trim.module.css"
import { Slider } from '@mantine/core';
import { PlayerPause, PlayerPlay, PlayerStop } from 'tabler-icons-react';

const trim = () => {
    const router = useRouter();
    const [invalid,setInvalid] = useState(false);
    const [start,setStart] = useState(0);
    const [end,setEnd] = useState(0);
    const [videoKey,setVideoKey] = useState('');
    const [value, setValue] = useState(0);
    const [duration, setDuration] = useState(0);
    const [play, setPlay] = useState(true);
    const [seeking, setSeeking] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
      if(!router.isReady){
        return;
      }
      const { id } = router.query;
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/trim/trimData`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: id
        })
      }).then(res => res.json()).then(data => {
        // console.log(data);
        if(data.status){
          setInvalid(false);
          setStart(data.trim.startTime);
          setEnd(data.trim.endTime);
          setVideoKey(data.trim.videoId);
          setReactPlayer(data.trim.startTime);
        }else{
          setInvalid(true);
        }
      })
    }, [router.isReady]);

    const playerRef = useRef(null);

    const setReactPlayer = (startTime) => {
      if(playerRef.current){
        playerRef.current.seekTo(startTime, 'seconds',{noSeekAhead: true});
        // console.log('seeked');
      }
    }

    const updateCurrentTime = () => {
      if (playerRef.current) {
        const currentTimeInSeconds = playerRef.current.getCurrentTime();
        // console.log(currentTimeInSeconds);
        if(currentTimeInSeconds >= end){
          //end the video
          setPlay(false);
        }
        setCurrentTime(currentTimeInSeconds-start);
        setValue(((currentTimeInSeconds-start)/(end-start))*100);
        setTimeout(updateCurrentTime, 1000);
      }
    };

    const handleSeek = (num) => {
      setValue(num);
      setSeeking(true);
    }

    useEffect(() => {
      if(seeking){
        setSeeking(false);
        const newTime = (value/100)*(end-start)+start;
        setReactPlayer(newTime);
      }
    },[seeking])


    return (
        <div>
            <Navbar />
            <div className={styles.container}>
              <div className={styles.video}>
                {invalid && <h1>Invalid Video</h1>}
                {!invalid && 
                  <ReactPlayer
                    url={`https://d26bootyjexpt7.cloudfront.net/${videoKey}`}
                    ref={playerRef}
                    playing={play}
                    onSeek={updateCurrentTime}
                    onDuration={(duration) => setDuration(duration)}
                  />
                }
              </div>
              <div className={styles.trim}>
                <div className={styles.trimContainer}>
                  {!play ?
                  <PlayerPlay size={30} onClick={e => setPlay(!play)} />:
                  <PlayerPause size={30} onClick={e => setPlay(!play)} />
                  } 
                  <Slider
                    className={styles.slider}
                    value={value} 
                    onChange={(num) => handleSeek(num)}
                    marks={
                      [
                        { value: 0, label: new Date((currentTime) * 1000).toISOString().slice(14, 19) },
                        { value: 100, label: new Date((end-start) * 1000).toISOString().slice(14, 19) },
                      ]
                    }
                  />
                </div>
              </div>
           </div>
        </div>
    )}

export default trim;