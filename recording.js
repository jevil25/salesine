import React, { useEffect, useState } from 'react'
import moment from 'moment';
import Navbar from './src/components/Navbar'
import next from '../../public/assets/next.png'
import nextw from '../../public/assets/nextw.png'
import plus from '../../public/assets/plus.png'
import styles from '../styles/Recording.module.css'
import previous from '../../public/assets/previous.png'
import share from '../../public/assets/share.png'
import play from '../../public/assets/play.png'
import next1 from '../../public/assets/next1.png'
import close from '../../public/assets/close.png'
import video from '../../public/assets/video.png'
import transcript from '../../public/assets/transcript.png'
import video1 from '../../public/assets/video1.png'
import transcript1 from '../../public/assets/transcript1.png'
import Stats from './src/components/Stats'
import Chat from './src/components/Chat'
import Interest from './src/components/Interest';
import ReactPlayer from 'react-player';
import Transcript from './src/components/Transcript';
import { useRef } from 'react';
import Company from './src/components/Company';
import axios from 'axios';
import { useRouter } from 'next/router';

const Recording = (props) => {
  const [item, setItem] = useState({recording_files: [{
    download_url: '',
  }]})
  const router = useRouter();
  if(typeof window !== 'undefined') {
    if(localStorage.getItem('token') === null) {
        router.push('/login');
    }
  }
  const [trans, setTrans] = useState('')
  
  

  useEffect(() => {
    setItem(JSON.parse(localStorage.getItem('recording')))
    console.log(item, 'this is item')
    const populateRecordings = () => {      
        const data = axios.get('api/diarizer')
            .then((response) => {
            let obj = response.data
            console.log(obj, 'this is obj')
            if(obj.status == true) {
              setTrans(obj.data)
              console.log(trans)
            }
            })
            .catch((err) => {
            console.log(err);
            })
        }
        //populateRecordings()
  },[])

  // const [change, setChange] = useState(false)
  const [isShare, setShare] = useState(false)
  const [isTranscript, setIsTranscript] = useState(false)
  // const [speed, setSpeed] = useState("1x")
  const [isNav, setIsNav] = useState({
    isOpen: false,
    openInterest: false,
    openInteraction: false,
    openCompany: false,
    openSlides: false,
  })

  const [states, setStates] = useState({
    playing: false,
    duration: 0,
    playedTime: 0,
    playbackSpeed: 1,
    playedSeconds: 0,
    played: 0,
    loaded: 0,
    loadedSeconds: 0,
  })

  const handleDuration = (duration) => {
    const totalDuration = new Date(duration * 1000).toISOString().slice(14, 19);
    setStates({
      ...states,
      duration: totalDuration
    })
  }

  const handlePlayback = (e) =>{
    setStates({
      ...states,
      playbackSpeed: e
    })
  }

  const handleEnd = () => {
    setStates({
      ...states,
      playing: false,
    })
  }

  
  const handleProgress = state => {
    // console.log(state)
    console.log(wave.current)
    console.log(playbackSpeed)
    const playedTime = state.playedSeconds;
    const playedSeconds = new Date(playedTime * 1000).toISOString().slice(14, 19);
    setStates({
      ...states,
      playedTime: playedTime,
      playedSeconds: playedSeconds,
      played: state.played,
      loaded: state.loaded
    })
  }

  const [tags, setTags] = useState([])

  function handleKeyDown(e) {
    if (e.key !== 'Enter') return
    const value = e.target.value
    if (!value.trim()) return
    setTags([...tags, value])
    e.target.value = ''
  }
  
  
  function removeTag(index) {
    setTags(tags.filter((el, i) => i !== index))
  }
  
  const { playing, playedSeconds, duration, playbackSpeed, loaded, played } = states
  
  
  
  const formatDate = moment().format('LL')
  const player = useRef();
  const wave = useRef();
  return (
    <>
      {isShare && <div className={styles.share}>
        <div className={styles.shareBlock}>
          <div className={styles.shareHeader}>
            <div className={styles.shareHead}>Share</div>
            <div className={styles.shareClose}>
              <img src="https://img.icons8.com/ios-glyphs/12/ffffff/delete-sign.png" alt="close" onClick={() => setShare(false)} />
            </div>
          </div>
          <div className={styles.shareBody}>
            <div className={styles.tagBody}>
              <div>Share with:</div>
              <div className={styles.tagInputConrainer}>
                <div className={styles.tagPlacer}>
                  {tags.map((tag, index) => (
                    <div className={styles.tagItem} key={index}>
                      <span className={styles.text}>{tag}</span>
                      <img src={close} alt="" onClick={() => removeTag(index)} />
                    </div>
                  ))}
                </div>
                <input onKeyDown={handleKeyDown} type="text" className={styles.tagsInput} />
              </div>
            </div>
            <div className={styles.addMessage}>
              <div>Add a message:</div>
              <div className={styles.messageContainer}>
                <textarea placeholder='Message' />
              </div>
            </div>
            <div className={styles.trimContainer}>
              <div className={styles.trimHeader}>
                <div className={styles.trimHead}>Trim call:</div>
                <div className={styles.trimFilter}>
                  <div className={styles.trimType}>Start</div>
                  <div className={styles.trimTime}>00:00</div>
                  <div>-</div>
                  <div className={styles.trimTime}>00:00</div>
                  <div className={styles.trimType}>End</div>
                </div>
              </div>
              <div className={styles.trimBody}>
                <img src={play} alt="" />
              </div>
            </div>
            <div className={styles.shareFooter}>
              <div className={styles.shareFooterPart1}>
                <div className={styles.footer1Button}>
                  <div className={styles.footerButtonName}>Share</div>
                  <img src={nextw} alt="" />
                </div>
                <div className={styles.footer1Link}>
                  <img src={share} alt="" />
                  <div className={styles.shareable}>Get shareable link</div>
                </div>
              </div>
              <div className={styles.shareFooterPart2}>
                <div className={styles.shareable}>Access to this call will expire in </div>
                <div className={styles.shareableNumber}>5</div>
                <div className={styles.shareable}> days</div>
              </div>
            </div>
          </div>
        </div>
      </div>}
      <Navbar type='recording' />
      <div className={styles.headerWrapper}>
        <div className={styles.topics}>
          <div className={styles.topic} onClick={() => {
            setIsNav({
              openCompany: false,
              openInterest: (!isNav.openInterest),
              openInteraction: false,
              openSlides: false
            })
          }}>
            <p>Point of Interest</p>
          </div>
          <div className={styles.topic} onClick={() => {
            setIsNav({
              openCompany: false,
              openInterest: false,
              openInteraction: (!isNav.openInteraction),
              openSlides: false
            })
          }}>
            <p>Interaction stats</p>
          </div>
          <div className={styles.topic} onClick={() => setIsNav({
            openCompany: (!isNav.openCompany),
            openInterest: false,
            openInteraction: false,
            openSlides: false
          })}>
            <p>Company</p>
          </div>
          <div className={styles.topic} onClick={() => setIsNav({
            openCompany: false,
            openInterest: false,
            openInteraction: false,
            openSlides: (!isNav.openSlides)
          })}>
            <p>Slides</p>
          </div>
        </div>
        <div className={styles.date}>
          {formatDate}
        </div>
      </div>
      {isNav.openCompany && <Company />}
      {!isNav.openCompany &&
        <>
          <div className={styles.recordingWrapper}>
            {isNav.openInteraction && <Stats />}
            {isNav.openInterest && <Interest />}
            <div className={((isNav.openInterest || isNav.openInteraction || isNav.openCompany || isNav.openSlides) ? styles.playerWrapper : styles.playerWrapper2)}>
              <div className={styles.twoicons}>
                <div className={styles.first} onClick={() => setShare(true)}>
                  <div>Share</div>
                  <img src={next} alt="" style={{ width: "14px", height: "14px" }} />
                </div>
                <div className={styles.first}>
                  <div>Add to Library</div>
                  <img src={plus} alt="" />
                </div>
              </div>
              {console.log(item)}
              {!isTranscript &&
                <>
                  <div className={styles.Player2}>
                    <ReactPlayer
                      ref={player}
                      url={item.recording_files[0].download_url}
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
                  </div>
                </>
              }
              {isTranscript &&
                <div className={styles.transcriptApp}>
                   {trans}
                </div>
              }
              <div className={styles.recording}>
                <div className={styles.part1}>
                  <img src="https://img.icons8.com/color/30/000000/video-call--v1.png" alt="video" />
                  <p>Connect Softbuilt to Acme Co.</p>
                </div>
                <div className={styles.divider}></div>
                <div className={styles.part2}>
                  <div className={styles.controllers} id='controll'>
                    <img src={previous} alt="previous" className={styles.previous} />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={playing ? "https://img.icons8.com/ios-glyphs/50/FFFFFF/circled-pause.png" : "https://img.icons8.com/ios-glyphs/50/ffffff/play-button-circled--v1.png"} alt="play" className={styles.play} onClick={() => setStates({
                        ...states,
                        playing: (!playing)
                      })} style={{ zIndex: '4' }} />
                      <div style={{ background: '#3F51B5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30px', height: '30px', position: 'absolute' }}></div>
                    </div>
                    <img src={next1} alt="next" className={styles.next} />
                  </div>
                  <div className={styles.loader}>
                    <div className={styles.current}>{playedSeconds}</div>
                    <div className={styles.length}>
                      <div className={styles.loadedLength} style={{ width: `${loaded * 100}%`, height: '5px', backgroundColor: 'white', zIndex: '1', position: 'absolute' }} ></div>
                      <div className={styles.playedLength} style={{ width: `${played * 100}%`, height: '5px', backgroundColor: '#3F51B5', zIndex: '2', position: 'absolute' }}></div>
                    </div>
                    <div className={styles.total}>{duration}</div>
                  </div>
                  <div className={styles.button}>
                    {!(isNav.openCompany || isNav.openInteraction || isNav.openInterest || isNav.openSlides) &&
                      <>
                        <div className={isTranscript ? styles.activeOne : styles.buttons} onClick={() => {
                          setIsTranscript(true);
                          setStates({
                            ...states,
                            playing: false
                          })
                        }}>Transcript</div>
                        <div className={!isTranscript ? styles.activeOne : styles.buttons} onClick={() => setIsTranscript(false)}>Video</div>
                      </>
                    }
                    {(isNav.openCompany || isNav.openInteraction || isNav.openInterest || isNav.openSlides) &&
                      <>
                        <div className={isTranscript ? styles.activeOne : styles.buttons} onClick={() => setIsTranscript(true)}>
                          <img src={isTranscript ? transcript1 : transcript} alt="" />
                        </div>
                        <div className={!isTranscript ? 'activeOne' : 'buttons'} onClick={() => setIsTranscript(false)}>
                          <img src={isTranscript ? styles.video1 : styles.video} alt="" />
                        </div>
                      </>
                    }
                  </div>
                </div>
              </div>
             
            </div>
            <Chat />
          </div>
        </>
      }

    </>
  )
}

export default Recording