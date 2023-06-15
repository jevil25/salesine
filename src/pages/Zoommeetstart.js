'use client';

import Navbar from "../components/Navbar";
import styles from "../styles/StartMeeting.module.css";
import { useState,useEffect } from "react"
import { useRouter } from "next/router";
// dotenv.config();

export default function Zoommeetstart() {
  const [meetingTopic, setMeetingTopic] = useState("");
  const [meetingHours, setMeetingHours] = useState("");
  const [meetingMins, setMeetingMins] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [autoRecording, setAutoRecording] = useState("yes");
  const [link, setLink] = useState("");
  const [redirecting, setRedirecting] = useState(false);
  const router = useRouter();
  const backEndURl = 'https://salestine.onrender.com/';
  // function to check status of whether auth code has been fetched
  // function checkisFetched() {
  //   const isFetched = useLocalStorage("isFetched", "getvalue");
  //   console.log("isfetched is " + isFetched);
  //   return isFetched;
  // }

  // function to get the auth code
  async function fetchauthdata() {
    // Fetch the authorization endpoint
    const urlnew = await fetch(`${backEndURl}/api/authorize`).then(
      (res) => res.json()
    );
    console.log("url is");
    console.log(urlnew);
    //Redirect the user to the Zoom authorization URL
      window.location.href = urlnew.authorizationUrl;
  }

  async function fetchAccessToken(code){
    console.log("fecthing access token")
    let response = await fetch(`${backEndURl}/api/callback`, {
      method: "POST",
      body: JSON.stringify({
        code: code
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (response.ok) {
      let data = await response.json();
      console.log(data);
      if(data){
        localStorage.setItem("ak",JSON.stringify(data))
      }
      return data
    } else {
      console.log("Error: " + response.status);
    }
  }

  async function startmeet(accessToken) {
    let meetInfo = await fetch(`${backEndURl}/api/start-meet`, {
      method: "POST",
      body: JSON.stringify({ accessToken: accessToken, meetingTopic: meetingTopic, meetingDate: meetingDate+"T"+meetingTime+"00", meetingDuration: meetingHours*60+meetingMins, autoRecording: autoRecording }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((meet)=>{
        console.log("this is meetinfo")
        console.log(meet.result.start_url);
        setLink(`${meet.result.start_url}`)
        router.push(`${meet.result.start_url}`)
        console.log("after window open")
      })
      .catch((err) => console.log("Error:" + err));
  }
  //  let status = checkisFetched()
  //   if (status == 0) {
  //     status = useLocalStorage("isFetched", "setvalue")
  function initAuth() {
    const data = {
      topic: meetingTopic,
      type: 2,
      start_time: meetingDate+"T"+meetingTime+":00",
      duration: meetingHours*60+meetingMins,
      autoRecording: autoRecording,
    }
    console.log(data)
    fetchauthdata();
  }

  async function fetchData() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    console.log(code);
    if (code) {
      setRedirecting(true);
      let resp = await fetchAccessToken(code);
      let result = JSON.parse(localStorage.getItem("ak"))
      // let { access_token } = resp;
      console.log(result)
      startmeet(result.access_token)
    }
  }
  useEffect(() => {
    setRedirecting(false);
    fetchData();
  }, []);
  // fetchData();

  return (
    <>
    <Navbar />
    {redirecting ? (
      <div className={styles.main}>
        <h1>Redirecting to Zoom...</h1>
      </div>
    )
    :(
    <div className={styles.main}>
          <h1>Zoom Meeting</h1>
          <div className={styles.form}>
            <label>Meeting Topic</label>
            <input
              type="text"
              value={meetingTopic}
              onChange={(e) => setMeetingTopic(e.target.value)}
              className={styles.input}
            />
            <label>Meeting Time</label>
            <input
              type="date"
              value={meetingDate}
              onChange={(e) => setMeetingDate(e.target.value)}
              className={styles.input}
            />
            <input
              type="time"
              value={meetingTime}
              onChange={(e) => setMeetingTime(e.target.value)}
              className={styles.input}
            />
            <label>Meeting Duration</label>
              <select name="Hours" onChange={e => setMeetingHours(e.target.value)}>
                {[...Array(25).keys()].map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              Hour

              <select name="Minutes" onChange={e => setMeetingMins(e.target.value)}>
                {[...Array(61).keys()].map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              Minutes

              <label>Auto Recording</label>
              <select name="AutoRecording" onChange={e => setAutoRecording(e.target.value)}>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>

              <button type="submit" onClick={initAuth} className={styles.button}>
                Join Meeting
              </button>

          </div>
        </div>
    )}
      </>
  );
}
