import { Divider, Card, Button, Group, Badge } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
// import ReactPlayer from "react-player";
import Message from "../components/Message";

export default function Recordings() {
  const [topic, setTopic] = useState("");
  const [id, setId] = useState("");
  const [recording_drive_link, setRecording_drive_link] = useState("");
  const [comments, setComments] = useState([]);
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
      const data = JSON.parse(localStorage.getItem("recording"));
      console.log(data);
      let meet_data = await fetch("/api/getonerecord", {
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
      setTopic(meet_data.topic);
      setId(meet_data._id);
      setRecording_drive_link(meet_data.recordingLink);
      setComments(() => {
        let wrapped_comments = meet_data.comments;
        let new_comments = [];
        for (let i = 0; i < wrapped_comments.length; i++) {
          new_comments[i] = `<Message
             messageText="${wrapped_comments[i].text}"
             author="${wrapped_comments[i].author}"
             timestamp="${wrapped_comments[i].timestamp}"
           />`;
        }
        // wrapped_comments.map((comment) => {
        //     return `<Message
        //   messageText=${comment.text}
        //   author=${comment.author}
        //   timestamp=${comment.timestamp}
        // />`;
        // });
        // console.log("this is wrapped comments");
        // console.log(new_comments);
        return new_comments;
      });
      console.log(comments[0]);
    }
    getdata();
  }, []);
  // setTrans(meet_data.trans);

  return (
    <>
      <Navbar type="recording" />
      <div style={{ margin: "20px" }}>
        <h1>Recording for {topic} Meet</h1>
        <h2>ID : {id} </h2>
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
            {btn === "Transcript" ? (
              <iframe
                src={`${recording_drive_link}`}
                width="740"
                height="400"
                allow="autoplay"
              ></iframe>
            ) : (
              <Card
                shadow="sm"
                padding="xs"
                radius="md"
                withBorder
                style={{ height: "400px", cursor: "pointer", width: "60%" }}
              >
                <h2 style={{ textAlign: "center" }}>Transcript</h2>
                <h3>{trans}</h3>
              </Card>
            )}
          </div>
          <div id="chatbox">
            <div id="messages" style={{ height: "300px", overflowY: "auto" }}>
              <Message
                messageText="I like what Jim had to say about the startegy to bring in the new goods"
                author="Parth"
                timestamp="10:12 AM,Today"
              />
              {[...comments]}
              {/* <Message
                messageText="I like what Jim had to say about the startegy to bring in the new goods"
                author="Parth"
                timestamp="10:12 AM,Today"
              />
              <Message
                messageText="I like what Jim had to say about the startegy to bring in the new goods"
                author="Parth"
                timestamp="10:12 AM,Today"
              />
              <Message
                messageText="I like what Jim had to say about the startegy to bring in the new goods"
                author="Parth"
                timestamp="10:12 AM,Today"
              />
              <Message
                messageText="I like what Jim had to say about the startegy to bring in the new goods"
                author="Parth"
                timestamp="10:12 AM,Today"
              />
              <Message
                messageText="I like what Jim had to say about the startegy to bring in the new goods"
                author="Parth"
                timestamp="10:12 AM,Today"
              /> */}
            </div>
            <div className="messageInput" style={{ marginTop: "10px" }}>
              <input type="text" placeholder="Enter a message" />
              <button>Send</button>
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
