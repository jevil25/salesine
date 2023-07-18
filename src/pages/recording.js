import React, { useState, useRef } from 'react';
import moment from 'moment';
import Navbar from '../components/Navbar';
import next from '../../public/assets/next.png';
import video from '../../public/assets/video.png';
import video1 from '../../public/assets/video1.png';
import transcript1 from '../../public/assets/transcript1.png';
import Stats from '../components/Stats';
import Chat from '../components/Chat';
import Interest from '../components/Interest';
import Transcript from '../components/Transcript';
import Company from '../components/Company';
import styles from '../styles/Recording.module.css'; // Import CSS module styles
import ReactPlayer from 'react-player';
import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/image";
import AddToLibrary from '../components/AddToLibrary';
import { Modal } from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { Button,Text,Loader } from '@mantine/core';
import { IconClock } from '@tabler/icons-react';
import Link from 'next/link';
// import dynamic from "next/dynamic";

// const Waveform = dynamic(() => import("../components/WaveSurfer"), { ssr: false });

const recording = () => {
  const [isShare, setShare] = useState(false);
  const [isTranscript, setIsTranscript] = useState(false);
  const [load, setLoad] = useState(false);
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
  const [analysis, setAnalysis] = useState([]);
  const [meetHostId, setMeetHostId] = useState("");
  const [fileId, setFileId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [trimId, setTrimId] = useState("");
  const [linkModal, setLinkModal] = useState(false);
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
      setFileId(meet_data.file[0].id);
      setAnalysis(meet_data.analysis);
      setMeetId(meet_data.meetid);
      setMeetHostId(meet_data.meetHostId);
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
    setAnalysis(meet_data.analysis);
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

  const share = () => {
    setLoad(true);
    console.log(startTime, endTime);
    if(startTime === "" || endTime === "") {
      alert("Please enter both start time and end time");
      setLoad(false);
      return;
    }
    let start = startTime.split(":");
    let end = endTime.split(":");
    let start_time = parseInt(start[0])*3600 + parseInt(start[1])*60 + parseInt(start[2]);
    let end_time = parseInt(end[0])*3600 + parseInt(end[1])*60 + parseInt(end[2]);
    console.log(start_time, end_time);
    let duration = end_time - start_time;
    console.log(duration);
    if(duration < 0) {
      setLoad(false);
      alert("Start time cannot be greater than end time");
      return;
    }
    fetch(`${BACK_END_URL}/trim/trim`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        meetId: meetid,
        startTime: start_time,
        endTime: end_time,
        videoId: recording_drive_link,
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if(data.status){
        setTrimId(data.trim.id)
        setLinkModal(true)
      }
      else
        alert("Error in trimming");
      setShare(false);
      setLoad(false);
    }
    )
  }

  return (
    <>
      {isShare && (
        // give fields for start time and end time
        <Modal onClose={() => setShare(false)} opened={isShare} title={"Share"} size="md">
          <div className={styles.shareModal}>
           <div className={styles.shareModal1}>
            Enter Trim Timming
            </div>
            <div className={styles.shareModal2}>
              Start Time: <TimeInput icon={<IconClock size="1rem" stroke={1.5} />} withSeconds  placeholder="Start Time" onChange={e => setStartTime(e.target.value)} />
              End Time: <TimeInput icon={<IconClock size="1rem" stroke={1.5} />}   withSeconds placeholder="End Time" onChange={e => setEndTime(e.target.value)} />
            </div>
            <Button 
              onClick={() => share()}
              style={{"marginTop":"10px","width":"100%"}}
            >
              {
                !load ?
                <Text>
                  Share
                </Text>
                :
                <Loader color="dark"/>
              }
            </Button>
          </div>
        </Modal>      
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
            {isNav.openInteraction && <Stats
              stats={analysis}
              meetHostId={meetHostId}
            />}
            {isNav.openInterest && <Interest />}
            <div className={((isNav.openInterest || isNav.openInteraction || isNav.openCompany || isNav.openSlides) ? styles.playerWrapper : styles.playerWrapper2)}>
            <div className={styles.twoicons}>
              <div className={styles.first} onClick={() => setShare(true)}>
                <div>Share</div>
                <Image src={next} alt="" style={{ width: "14px", height: "14px" }} />
              </div>
              <div className={styles.first}>
                <AddToLibrary
                  fileId={fileId}
                />
              </div>
            </div>
            {!isTranscript &&
              <>
                <div className={styles.Player2}>
                  {recording_drive_link !=="" ? 
                  <ReactPlayer
                    ref={player}
                    url={`https://d26bootyjexpt7.cloudfront.net/${recording_drive_link}`}
                    controls
                    width='100%'
                    height='100%'
                    playing={playing}
                    onPlay = {()=>{setStates({
                      ...states,
                      playing:true
                    })
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
            {/* <DynamicWavesurfer
              src={`https://d26bootyjexpt7.cloudfront.net/${`git-meet/Product%20Marketing%20Meeting%20(weekly)%202021-06-28.mp4`}`}
              playing={playing}
              barWidth={4}
              barHeight={1}
              audioRate={playbackSpeed}
              ref={wave}
              interact={false}
              backend='MediaElement'
              waveColor='#3F51B5'
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
        {
          linkModal &&
          <Modal onClose={() => setLinkModal(false)} opened={linkModal} title={"Share Link"} size="md">
            <Text>Your Shareable link</Text>
            <Link href={`/trim/${trimId}`}>{`${process.env.NEXT_PUBLIC_FRONTEND_URL}/trim/${trimId}`}</Link>
          </Modal>
        }
        </>
      }

    </>
  );
};

export default recording;
