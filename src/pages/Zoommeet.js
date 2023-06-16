import { useEffect, useState } from "react";
import styles from "../styles/JoinMeeting.module.css";
import Navbar from "../components/Navbar";
import router from "next/router";
import isTokenExpired from "../utils/ExpirationChecker";


export default function Zoommeet() {
  const [meetingId, setMeetingId] = useState("");
  const [meetingPassword, setMeetingPassword] = useState("");
  const backEndURl = 'http://localhost:5000';

  const joinMeeting = (e) => {
    e.preventDefault();
    if (!meetingId || !meetingPassword) {
      alert("Please enter meeting id and password");
      return;
    }
    if(isTokenExpired(localStorage.getItem("accessToken"))){
      fetch(`${backEndURl}/api/newAccessToken`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ refreshToken:value })
        })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          localStorage.removeItem("accessToken")
          localStorage.removeItem("refreshToken")
          localStorage.removeItem("expiresIn")
          localStorage.setItem("accessToken",data.access_token)
          localStorage.setItem("refreshToken",data.refresh_token)
          localStorage.setItem("expiresIn",data.expiryTime)
        })
    }
    const payload = {
      meetingId: meetingId,
      meetingPassword: meetingPassword,
      accessToken: localStorage.getItem("accessToken"),
    };
    const params = new URLSearchParams(payload).toString();
    router.push(`/meeting?${params}`);
  };

  return (
    <>
      <Navbar types="calls"/>
      <div className={styles.main}>
        <h1>Zoom Meeting</h1>
        <form className={styles.form}>
          <label>Meeting ID</label>
          <input
            type="text"
            value={meetingId}
            onChange={(e) => setMeetingId(e.target.value)}
            className={styles.input}
          />
          <label>Meeting Password</label>
          <input
            type="text"
            value={meetingPassword}
            onChange={(e) => setMeetingPassword(e.target.value)}
            className={styles.input}
          />
          <button type="submit" onClick={joinMeeting} className={styles.button}>
            Join Meeting
          </button>
        </form>
      </div>
    </>
  );
}

