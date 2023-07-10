import React, { useState, useRef } from 'react';
import moment from 'moment';
//import Wavesurfer from 'react-wavesurfer.js';
import Navbar from '../components/Navbar';
import next from '../../public/assets/next.png';
import nextw from '../../public/assets/nextw.png';
import plus from '../../public/assets/plus.png';
import close from '../../public/assets/close.png';
import video from '../../public/assets/video.png';
import transcript from '../../public/assets/transcript.png';
import video1 from '../../public/assets/video1.png';
import transcript1 from '../../public/assets/transcript1.png';
import Stats from '../components/Stats';
import Chat from '../components/Chat';
import Interest from '../components/Interest';
import Transcript from '../components/Transcript';
import Company from '../components/Company';
import styles from '../styles/Recording.module.css'; // Import CSS module styles
import Video from '../google/video';
import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/image";

const recording = () => {
  const [isShare, setShare] = useState(false);
  const [isTranscript, setIsTranscript] = useState(false);
  const [isNav, setIsNav] = useState({
    isOpen: false,
    openInterest: false,
    openInteraction: false,
    openCompany: false,
    openSlides: false,
  });
  
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

  const handleDuration = (duration) => {
    const totalDuration = new Date(duration * 1000).toISOString().slice(14, 19);
    setStates({
      ...states,
      duration: totalDuration,
    });
  };

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

  const [tags, setTags] = useState([]);

  function handleKeyDown(e) {
    if (e.key !== 'Enter') return;
    const value = e.target.value;
    if (!value.trim()) return;
    setTags([...tags, value]);
    e.target.value = '';
  }

  function removeTag(index) {
    setTags(tags.filter((el, i) => i !== index));
  }

  const { playing, playedSeconds, duration, playbackSpeed, loaded, played } = states;

  const formatDate = moment().format('LL');
  const player = useRef();
  const wave = useRef();

  const BACK_END_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000" ;
  const [topic, setTopic] = useState("");
  const [id, setId] = useState("");
  const [recording_drive_link, setRecording_drive_link] = useState("");
  const [comments, setComments] = useState([]);
  const [email, setEmail] = useState("");
  const [meetid, setMeetId] = useState("");
  const [transcript, setTranscript] = useState([]);
  const router = useRouter();
  if (typeof window !== "undefined") {
    if (localStorage.getItem("token") === null) {
      router.push("/login");
    }
  }
  const [btn, setBtn] = useState("Transcript");
  const toggleHandler = () => {
    if (btn === "Recording") {
      setBtn("Transcript");
    } else {
      setBtn("Recording");
    }
  };

  useEffect(() => {
    async function getdata() {
      setEmail(localStorage.getItem("email"));
      const data = JSON.parse(localStorage.getItem("recording"));
      console.log(data);
      let meet_data = await fetch(`${BACK_END_URL}/getonerecord`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          meet_id: data,
        }),
      })
        .then((res) => res.json())
        .then((data) => data.meeting);
      // .then((data)=>console.log(data));
      console.log(meet_data);
      setTopic(meet_data.topic);
      setId(meet_data.id);
      setRecording_drive_link(meet_data.file[0].videoId);
      setMeetId(meet_data.meetid);
      setTranscript(meet_data.transcript)
      setComments(() => {
        return meet_data.comments;
      });
    }

    async function getTranscript() {
      let transcript = await fetch(`${BACK_END_URL}/transcribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          meet_id: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if(data.message === "success")
            setTranscript(data.data);
        });
      }
    getdata();
  }, []);
  async function getdata() {
    setEmail(localStorage.getItem("email"));
    const data = JSON.parse(localStorage.getItem("recording"));
    console.log(data);
    let meet_data = await fetch(`${BACK_END_URL}/getonerecord`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        meet_id: data,
      }),
    })
      .then((res) => res.json())
      .then((data) => data.meeting);
    // .then((data)=>console.log(data));
    console.log(meet_data);
    setTopic(meet_data.topic);
    setId(meet_data.id);
    setRecording_drive_link(meet_data.file[0].videoId);
    setMeetId(meet_data.meetid);
    setComments(() => {
      return meet_data.comments;
    });
  }
  // setTrans(meet_data.trans);

  async function sendMessage() {
    console.log(email);
    let text = document.getElementById("commentinput").value;
    document.getElementById("commentinput").value = "";
    let timestamp = Date.now();
    const updated_meet = await fetch(`${BACK_END_URL}/Sendmessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        meet_id: id,
        text: text,
        author: email,
        flag:"send"
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        getdata();
      });
  }

  return (
    <>
      {isShare && (
        <div className={styles.share}>
          <div className={styles.shareBlock}>
            <div className={styles.shareHeader}>
              <div className={styles.shareHead}>Share</div>
              <div className={styles.shareClose}>
                <Image src={close} alt="close" onClick={() => setShare(false)} />
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
                        <Image src={close} alt="" onClick={() => removeTag(index)} />
                      </div>
                    ))}
                  </div>
                  <input onKeyDown={handleKeyDown} type="text" className={styles['tags-input']} />
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
                  <Image src={plus} alt="" />
                </div>
              </div>
              <div className={styles.shareFooter}>
                <div className={styles.shareFooterPart1}>
                  <div className={styles.footer1Button}>
                    <div className={styles.footerButtonName}>Share</div>
                    <Image src={nextw} alt="" />
                  </div>
                  <div className={styles.footer1Link}>
                    <Image src={video} alt="" />
                    <div className={styles.shareable}>Get shareable link</div>
                  </div>
                </div>
                <div className={styles.shareFooterPart2}>
                  <div className={styles.shareable}>Access to this call will expire in</div>
                  <div className={styles.shareableNumber}>5</div>
                  <div className={styles.shareable}>days</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Navbar type="recording" />
      <div className={styles.headerWrapper}>
        <div className={styles.topics}>
          <div
            className={styles.topic}
            onClick={() =>
              setIsNav({
                openCompany: false,
                openInterest: !isNav.openInterest,
                openInteraction: false,
                openSlides: false,
              })
            }
          >
            <p>Point of Interest</p>
          </div>
          <div
            className={styles.topic}
            onClick={() =>
              setIsNav({
                openCompany: false,
                openInterest: false,
                openInteraction: !isNav.openInteraction,
                openSlides: false,
              })
            }
          >
            <p>Interaction stats</p>
          </div>
          <div
            className={styles.topic}
            onClick={() =>
              setIsNav({
                openCompany: !isNav.openCompany,
                openInterest: false,
                openInteraction: false,
                openSlides: false,
              })
            }
          >
            <p>Company</p>
          </div>
          <div
            className={styles.topic}
            onClick={() =>
              setIsNav({
                openCompany: false,
                openInterest: false,
                openInteraction: false,
                openSlides: !isNav.openSlides,
              })
            }
          >
            <p>Slides</p>
          </div >
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
                <Image src={next} alt="" style={{ width: "14px", height: "14px" }} />
              </div>
              <div className={styles.first}>
                <div>Add to Library</div>
                <Image src={plus} alt="" />
              </div>
            </div>
            {!isTranscript &&
              <>
                <div className={styles.Player2}>
                  {recording_drive_link !=="" ? 
                  <Video
                    id={recording_drive_link}
                    player={player}
                    playing={playing}
                    setStates={setStates}
                    states={states}
                    wave={wave}
                    handlePlayback={handlePlayback}
                    handleDuration={handleDuration}
                    handleProgress={handleProgress}
                    handleEnd={handleEnd}
                    />
                    :
                    <>
                      <div className={styles.noVideo}>
                        Our model is still processing the video. Please check back in a few minutes.
                      </div>
                    </>
                   }
                </div>
              </>
            }
            {isTranscript &&
              <div className={styles.transcriptApp}>
                <Transcript isNav={isNav} transcript={transcript} />
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
                  <Image src={next} alt="previous" className={styles.previous} />
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={playing ? "https://img.icons8.com/ios-glyphs/50/FFFFFF/circled-pause.png" : "https://img.icons8.com/ios-glyphs/50/ffffff/play-button-circled--v1.png"} alt="play" className={styles.play} onClick={() => setStates({ ...states, playing: !playing })} style={{ zIndex: '4' }} />
                    <div style={{ background: '#3F51B5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30px', height: '30px', position: 'absolute' }}></div>
                  </div>
                  <Image src={next} alt="next" className={styles.next} />
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
                        setStates({ ...states, playing: false });
                      }}>Transcript</div>
                      <div className={!isTranscript ? styles.activeOne : styles.buttons} onClick={() => setIsTranscript(false)}>Video</div>
                    </>
                  }
                  {(isNav.openCompany || isNav.openInteraction || isNav.openInterest || isNav.openSlides) &&
                    <>
                      <div className={isTranscript ? styles.activeOne : styles.buttons} onClick={() => setIsTranscript(true)}>
                        <Image src={isTranscript ? transcript1 : transcript} alt="" />
                      </div>
                      <div className={!isTranscript ? styles.activeOne : styles.buttons} onClick={() => setIsTranscript(false)}>
                        <Image src={isTranscript ? video1 : video} alt="" />
                      </div>
                    </>
                  }
                </div>
              </div>
            </div>
            {/* <Wavesurfer
              src="demo.mp4"
              playing={playing}
              barWidth={4}
              barHeight={1}
              audioRate={playbackSpeed}
              ref={wave}
              interact={false}
              backend='MediaElement'
              waveColor="#3F51B5"
              progressColor='#3F51B5'
              responsive={true}
            /> */}
          </div>
          <Chat 
            comments={comments}
            meet_id={meetid}
            sendMessage={sendMessage}
            getdata={getdata}
          />
        </div>
        </>
      }

    </>
  );
};

export default recording;
