import { useRouter } from 'next/router';
import { useEffect,useState,useRef } from 'react';
import Navbar from '../../components/Navbar';
import ReactPlayer from 'react-player';
import { useCallback } from 'react';
import styles from '../../styles/Recording.module.css';
import Image from 'next/image';
import next from '../../../public/assets/next.png';
import { set } from 'mongoose';


const trim = () => {
    //get id from router
    const router = useRouter()
    const [id, setId] = useState('')
    const [video, setVideo] = useState('')
    const [invalid, setInvalid] = useState(false)
    const [isReady, setIsReady] = useState(false);
    const [skip, setSkip] = useState(0);
    const [end, setEnd] = useState(0);
    const [playing, setPlaying] = useState(true);
    const [fetching, setFetching] = useState(true);
    const [skipdone, setSkipdone] = useState(false);
    const [startPlaying, setStartPlaying] = useState(true);
    const [states, setStates] = useState({
        playing: false,
        duration: 0,
        playedTime: 0,
        playbackSpeed: 1,
        playedSeconds: 0,
        played: 0,
        loaded: 0,
        loadedSeconds: 0,
      });

    useEffect(() => {
        if(!router.isReady) return
        setId(router.query.id)
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/trim/trimData`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: router.query.id
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.status){
                setInvalid(false)
                setVideo(data.trim.videoId)
                setSkip(data.trim.startTime)
                setEnd(data.trim.endTime)
                setFetching(false)
            }else{
                setInvalid(true)
            }
        })
    },[router.isReady])

    const player = useRef(null)
    const onReady = useCallback(() => {
        if (!isReady && !fetching) {
            console.log(skip)
          player.current.seekTo(skip);
            setIsReady(true);
        }
      }, [isReady]);

    //convert seconds to time
    const secondsToTime = (seconds) => {
        const h = Math.floor(seconds / 3600)
        const m = Math.floor(seconds % 3600 / 60)
        const s = Math.floor(seconds % 3600 % 60)
        return `${h > 0 ? h + ':' : ''}${m > 0 ? m + ':' : '00:'}${s > 0 ? s : '00'}`
    }

      const handlePlayback = (e) => {
        setStates({
          ...states,
          playbackSpeed: e,
        });
      };
    
      const handleEnd = () => {
        setStates({
          ...states,
          playing: false,
        });
      };
    
      const handleProgress = (state) => {
        const playedTime = state.playedSeconds;
        const playedSeconds = new Date(playedTime * 1000).toISOString().slice(14, 19);
        setStates({
          ...states,
          playedTime: playedTime,
          playedSeconds: playedSeconds,
          played: state.played,
          loaded: state.loaded,
        });
      };

      const durationCheck = (duration) => {
        const totalDuration = new Date(duration * 1000).toISOString().slice(14, 19);
        //check if end time is greater than total duration
        if (end < duration) {
            //stop video
            playing(false)
        }
      };

    return (
        <>
            <Navbar/>
            <div style={{marginTop:"50px",display: "flex",alignItems:"center",justifyContent:"center",width:"100%",height:"100%"}}>
                <div style={{display: "flex",alignItems:"center",justifyContent:"center",width:"60%","flexDirection":"column"}}>
                {invalid && <h1>Invalid Link</h1>}
                {!invalid &&
                <ReactPlayer
                    ref={player}
                    url={`https://d26bootyjexpt7.cloudfront.net/${`git-meet/Product%20Marketing%20Meeting%20(weekly)%202021-06-28.mp4`}`}
                    width='100%'
                    height='100%'
                    playing={startPlaying}
                    controls={false}
                    onReady={onReady}
                    onPlay={onReady}
                />
                }
                {/* <div className={styles.recording}>
              <div className={styles.part1}>
                <img src="https://img.icons8.com/color/30/000000/video-call--v1.png" alt="video" />
                <p>Connect Softbuilt to Acme Co.</p>
              </div>
              <div className={styles.divider}></div>
              <div className={styles.part2}>
                <div className={styles.controllers} id='controll'>
                  <Image src={next} alt="previous" className={styles.previous} />
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={states.playing ? "https://img.icons8.com/ios-glyphs/50/FFFFFF/circled-pause.png" : "https://img.icons8.com/ios-glyphs/50/ffffff/play-button-circled--v1.png"} alt="play" className={styles.play} onClick={() => setStates({ ...states, playing: !playing })} style={{ zIndex: '4' }} />
                    <div style={{ background: '#3F51B5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30px', height: '30px', position: 'absolute' }}></div>
                  </div>
                  <Image src={next} alt="next" className={styles.next} />
                </div>
                <div className={styles.loader}>
                  <div className={styles.current}>{states.playedSeconds}</div>
                  <div className={styles.length}>
                    <div className={styles.loadedLength} style={{ width: `${100}%`, height: '5px', backgroundColor: 'white', zIndex: '1', position: 'absolute' }} ></div>
                    <div className={styles.playedLength} style={{ width: `${states.played/states.duration * 100}%`, height: '5px', backgroundColor: '#3F51B5', zIndex: '2', position: 'absolute' }}></div>
                  </div>
                  <div className={styles.total}>{secondsToTime(states.duration)}</div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        </>
    );
}

export default trim;