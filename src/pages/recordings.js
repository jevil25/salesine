import { Divider, Card, Button, Group, Badge } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
// import ReactPlayer from "react-player";
import Message from "../components/Message";

export default function Recordings(){
  const [topic, setTopic] = useState("");
  const [id, setId] = useState("");
  const [recording_drive_link, setRecording_drive_link] = useState("");
  const [trans, setTrans] = useState("");
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
    const data = JSON.parse(localStorage.getItem("recording"));
    console.log(data);
    // setTopic(data.topic);
    // setId(data.id);
    // setRecording_drive_link(data.recording_drive_link);
    // setTrans(data.trans);
    
    console.log(topic);
  }, [typeof window]);

  return (
    <>
      <Navbar type="recording" />
      <div style={{ margin: "20px" }}>
        <h1>Recording for {topic}</h1>
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
              {/* <iframe
                src={`https://drive.google.com/file/d/${recording_drive_link}/preview`}
                width="740"
                height="400"
                allow="autoplay"
              ></iframe> */}
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
              />
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
