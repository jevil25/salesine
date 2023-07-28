import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ro } from "@faker-js/faker";
import Navbar from "../components/Navbar";

export default function advance_register() {
  const router = useRouter();
  const BACK_END_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";
  const [oldpassword, setoldpass] = useState("");
  const [newpassword, setnewpass] = useState("");
  const [email, setEmail] = useState("");
  const [stream, setStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [calendar, showCalendar] = useState(true);
  const [password, showPassword] = useState(true);
  const [voice, showVoice] = useState(true);
  const [appdownload, showAppdownload] = useState(true);

  useEffect(() => {
    if (!router.isReady) return;
    const id = router.query.id;
    const email = localStorage.getItem("email");
    setEmail(email);
    let voicediv = document.getElementById("voiceregistration");
    let passdiv = document.getElementById("passwordchange");
    let calendardiv = document.getElementById("googleCalendar");
    const downloadUrl = "https://drive.google.com/uc?id=18pywIGzS3fzzW8WxrjOXiUcS1SvwmPMq&export=download";
    const fileName = "Salesine.exe";
    console.log(id);

    if (id === "1") {
      showVoice(false);
    } else if (id === "2") {
      showPassword(false);
    } else if (id === "3") {
      showCalendar(false);
    } else if (id === "4") {
      showCalendar(false);
      showVoice(false);
    } else if (id === "5") {
      showCalendar(false);
      showPassword(false);
    } else if (id === "6") {
      showVoice(false);
      showPassword(false);
    }
  }, [router.isReady]);

  useEffect(() => {
    if (password === false && voice === false && calendar === false) {
      router.push("/");
    }
  }, [password, voice, calendar]);

  async function changepassword() {
    await fetch(`${BACK_END_URL}/changepassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        oldpassword,
        newpassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        showPassword(false);
      });
  }

  async function getVoice() {
    try {
      //Use MediaRecorder for recording audio
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      setStream(stream);
      const mediaRecorder = new MediaRecorder(stream);
      setMediaRecorder(mediaRecorder);
      mediaRecorder.ondataavailable = (e) => {
        setRecordedChunks(e.data);
      };
      mediaRecorder.start();
    } catch (err) {
      console.log("Error recording voice: " + err);
    }
  }

  useEffect(() => {
    stopRecording();
  }, [recordedChunks]);

  const stopRecording = async () => {
    if (stream && mediaRecorder && mediaRecorder.state === "recording") {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      mediaRecorder.stop();
      console.log(recordedChunks);
    } else {
      //get the recording and send it to the backend
      if (recordedChunks.length === 0) return;
      console.log(recordedChunks);
      const formData = new FormData();
      formData.append("audio_data", recordedChunks);
      formData.append("email", email);

      const res = await fetch(`${BACK_END_URL}/voicerec`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log(data);
      if (data.success) {
        showVoice(false);
      }
    }
  };

  const googleAuth = async () => {
    fetch(`${BACK_END_URL}/googleAuth`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        router.push(data.url);
      });
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Navbar />
      {password && (
        <Container id="passwordchange" size={800} my={80}>
          <Title
            align="center"
            sx={(theme) => ({
              fontFamily: `Greycliff CF, ${theme.fontFamily}`,
              fontWeight: 900,
            })}
          >
            Change Password
          </Title>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput
              label="Old Password"
              name="email"
              value={oldpassword}
              onChange={(e) => setoldpass(e.target.value)}
              placeholder="Old Password"
              size="md"
              required
            />
            <PasswordInput
              label="New Password"
              value={newpassword}
              name="password"
              onChange={(e) => setnewpass(e.target.value)}
              placeholder="New password"
              size="md"
              required
              mt="md"
            />
            <br />
            <Group position="apart" mt="lg"></Group>
            <Button
              fullWidth
              mt="xl"
              size="md"
              onClick={changepassword}
              color="indigo"
            >
              Change Password
            </Button>
          </Paper>
        </Container>
      )}

      {voice && (
        <Container id="voiceregistration" size={800} my={80}>
          <Title
            align="center"
            sx={(theme) => ({
              fontFamily: `Greycliff CF, ${theme.fontFamily}`,
              fontWeight: 900,
            })}
          >
            Voice Registration
          </Title>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            Press the start button and repeat the sentence into your microphone
            <br />
            <div
              style={{
                backgroundColor: "wheat",
                marginTop: "20px",
                padding: "10px",
              }}
            >
              I enjoy listening to music in my free time.What is the weather
              like today?
            </div>
            <Group position="apart" mt="lg"></Group>
            <Button
              fullWidth
              mt="xl"
              size="md"
              onClick={getVoice}
              color="indigo"
            >
              Start
            </Button>
            <Button
              fullWidth
              mt="xl"
              size="md"
              onClick={stopRecording}
              color="red"
            >
              Stop Recording
            </Button>
          </Paper>
        </Container>
      )}
      {calendar && (
        <>
          <Container id="voiceregistration" size={800} my={80}>
            <Title
              align="center"
              sx={(theme) => ({
                fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                fontWeight: 900,
              })}
            >
              Google Calender Registration
            </Title>

            <Paper
              withBorder
              shadow="md"
              p={30}
              mt={30}
              radius="md"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button id="googleCalendar" onClick={googleAuth}>
                Google calendar
              </Button>
            </Paper>
          </Container>
        </>
      )}

      {appdownload && (
        <Container id="userdetails" size={800} my={80}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Download our Companion Desktop App
        </Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection:"row",
              gap:"20px"
            }}
          >
            <Text style={{ whiteSpace: "nowrap" }} align="center">
              Download the companion Salesine Desktop App
            </Text>
            <Link href={"https://drive.google.com/uc?id=18pywIGzS3fzzW8WxrjOXiUcS1SvwmPMq&export=download"} download style={{textDecoration:"none"}}>
              <Button
                fullWidth
                mt="sm"
                size="sm"
                color="indigo"
                style={{ width: "10vw" }}
              >
                Download
              </Button>
            </Link>
        </div>
      </Paper>
    </Container>
      )}

      <Container
        id="voiceregistration"
        size={800}
        my={80}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Click on Skip to do this later in settings page</Text>
        <Button variant="gradient" onClick={(e) => router.push("/")}>
          Skip
        </Button>
      </Container>
    </>
  );
}
