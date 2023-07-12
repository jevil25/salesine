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

export default function advance_register() {
  const router = useRouter();
  const BACK_END_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";
  const ML_ENDPOINT_URL = process.env.ML_ENDPOINT_URL;
  const [oldpassword, setoldpass] = useState("");
  const [newpassword, setnewpass] = useState("");
  const [email, setEmail] = useState("");
  const [stream, setStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [calendar, showCalendar] = useState(true);
  const [password, showPassword] = useState(true);
  const [voice, showVoice] = useState(true);

  useEffect(() => {
    if (!router.isReady) return;
    const id = router.query.id;
    const email = localStorage.getItem("email");
    setEmail(email);
    // let voicediv = document.getElementById("voiceregistration");
    // let passdiv = document.getElementById("passwordchange");
    // let calendardiv = document.getElementById("googleCalendar");
    // console.log(id);

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

  // useEffect(() => {
  //   if (password === false && voice === false && calendar === false) {
  //     router.push("/");
  //   }
  // }, [password, voice, calendar]);

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
        if (password === false && voice === false && calendar === false) {
          router.push("/");
        }
      });
  }

  async function getVoice() {
    try {
      let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setStream(stream);
      const recorder = new MediaRecorder(stream);

      recorder.addEventListener("dataavailable", (event) => {
        if (event.data.size > 0) {
          setRecordedChunks((prevChunks) => [...prevChunks, event.data]);
        }
      });

      setMediaRecorder(recorder);
      recorder.start();
    } catch (err) {
      console.log("Error recording voice " + err);
    }
  }

  const stopRecording = async () => {
    if (stream && mediaRecorder && mediaRecorder.state === "recording") {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      mediaRecorder.stop();
      const recordedBlob = new Blob(recordedChunks, { type: "audio/wav" });
      console.log(recordedBlob)
      const audioUrl = URL.createObjectURL(recordedBlob);
      const audioElement = new Audio(audioUrl);
      // audioElement.play();
      const formData = new FormData();
      formData.append("audio_data", recordedBlob, "audio.wav");
      formData.append("email",email)
      const resp = await fetch(`${BACK_END_URL}/voicerec`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          showVoice(false);
          if (password === false && voice === false && calendar === false) {
                router.push("/");
              }
        });
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
        if (password === false && voice === false && calendar === false) {
          router.push("/");
        }
      });
  };

  return (
    <>
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
            {/* {invalid && <Text color="red" align="center">Invalid credentials</Text>} */}
            {/* {serverError && <Text color="red" align="center">Server error</Text>} */}
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
            {/* <Checkbox
                label="Keep me logged in"
                name="keep-logged-in"
                // onChange={(e) => setRemember(e.target.checked)}
              /> */}
            <Group position="apart" mt="lg">
              {/* <Anchor component="button" size="sm">
                  Forgot password?
                </Anchor> */}
            </Group>
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
        <Container id="googleCalendar" size={800} my={80}>
          <Button
            id="googleCalendar"
            style={{ marginLeft: "45%" }}
            onClick={googleAuth}
          >
            Google calendar
          </Button>
        </Container>
      )}
    </>
  );
}
