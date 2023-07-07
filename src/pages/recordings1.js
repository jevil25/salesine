import { Divider, Card, Button, Group, Badge } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
// import ReactPlayer from "react-player";
import Message from "../components/Message";
import { set } from "mongoose";
import Video from "../google/video";

export default function Recordings() {
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
      console.log(meet_data.comments);
      console.log(meet_data.videoLink);
      setTopic(meet_data.topic);
      setId(meet_data.id);
      setRecording_drive_link(meet_data.videoLink);
      setMeetId(meet_data.meetid);
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
    console.log(meet_data.videoLink);
    console.log(meet_data.comments);
    setTopic(meet_data.topic);
    setId(meet_data.id);
    setRecording_drive_link(meet_data.videoLink);
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
      <Navbar type="recording" />
      <div style={{ margin: "20px" }}>
        <h1>Recording for {topic} Meet</h1>
        <h2>ID : {meetid} </h2>
        <Divider />
        <br />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            columnGap: "40px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            {btn === "Transcript" && recording_drive_link !=="" ? (
              <Video
                id={recording_drive_link}
                />
            ) : (
              <Card
                shadow="sm"
                padding="xs"
                radius="md"
                withBorder
                style={{ height: "400px", cursor: "pointer", width: "60%" }}
              >
                <h2 style={{ textAlign: "center" }}>Transcript</h2>
                {transcript.length > 0 ? transcript.map((trans) => (<>
                  <h1>{trans.text}</h1>
                  <h4>{trans.startTime}   {trans.speaker}</h4>
                  </>
                )
                ) : (
                  <p>"no transcript"</p>
                )
                }
              </Card>
            )}
          </div>
          <div id="chatbox">
            <div id="messages" style={{ height: "300px", overflowY: "auto" }}>
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <Message
                    messageText={comment.text}
                    author={comment.author}
                    timestamp={comment.timestamp}
                    meet_id={id}
                    comment_id={comment.id}
                    key={comment.id}
                    fun={getdata}
                  />
                ))
              ) : (
                <p>"no comments"</p>
              )}
            </div>
            <div className="messageInput" style={{ marginTop: "10px" }}>
              <input
                type="text"
                id="commentinput"
                placeholder="Enter a message"
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        </div>
        <br />
        <Group>
          <Button size="md" onClick={() => router.push("/")}>
            Go Back
          </Button>
          <Button size="md" variant="outline" onClick={toggleHandler}>
            Toggle {btn}
          </Button>
        </Group>
      </div>
    </>
  );
}
