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
    LoadingOverlay,
    Slider,
  } from "@mantine/core";
  import Link from "next/link";
  import { useEffect, useState } from "react";
  import { useRouter } from "next/router";
  import { ro } from "@faker-js/faker";
  import Navbar from "../components/Navbar";
import { NavbarSimple } from "../components/SettingSideBar";
  
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
    const [calendar,showCalendar] = useState(false);
    const [password,showPassword] = useState(false);
    const [voice,showVoice] = useState(false);
    const [loading,setLoading] = useState(true);
    const [invalid,setIvalid] = useState(false);
    const [serverError,setServerError] = useState(false);
    const [user,setUser] = useState({});
  
    useEffect(() => {
      const email = localStorage.getItem("email");
      setEmail(email);

      fetch(`${BACK_END_URL}/getUserDetails`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            },
        body: JSON.stringify({
            email,
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            setLoading(false)
            if(data.message === "Email not found."){
                setIvalid(true)
            }
            else if(data.message === "Failed to retrieve recordings"){
                setServerError(true)
            }else{
                const user = data.user
                setUser(user)
                  if(user.role === "SUPERADMIN"){
                  }
                  else if (user.voice_rec === "" && user.password_change === "" && user.googleCalendar === "") {
                    showCalendar(true)
                    showVoice(true)
                    showPassword(true)
                  }
                  else if(user.googleCalendar === "" && user.password_change === ""){
                    showCalendar(true)
                    showPassword(true)
                  }
                  else if(user.googleCalendar === "" && user.voice_rec === ""){
                    showCalendar(true)
                    showVoice(true)
                  }
                  else if(user.password_change === "" && user.voice_rec===""){
                    showPassword(true)
                    showVoice(true)
                  }
                  else if( user.password_change === ""){
                    showPassword(true)
                  }
                  else if(user.voice_rec === ""){
                    showVoice(true)
                  }
                  else if(user.googleCalendar === ""){
                    showCalendar(true)
                  }
            }
        })
    }, []);
  
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
        let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setStream(stream);
        const recorder = new MediaRecorder(stream);
  
        recorder.addEventListener('dataavailable', (event) => {
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
      if (stream && mediaRecorder && mediaRecorder.state === 'recording') {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
        mediaRecorder.stop();
        const recordedBlob = new Blob(recordedChunks, { type: 'audio/wav' });
    const audioUrl = URL.createObjectURL(recordedBlob);
    const audioElement = new Audio(audioUrl);
    // audioElement.play();
   let resp = await fetch(`${BACK_END_URL}/voicerec`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    }).then((res)=>res.json()).then((data)=>{
      console.log(data);
      showVoice(false)
    })
      }
    }
  
    const googleAuth = async () => {
      fetch(`${BACK_END_URL}/googleAuth`, {
        method:'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(res => res.json())
      .then(data => {
        router.push(data.url)
      })
    }

    const sideBarContent = []
  
    return (
      <>
      <Navbar 
        type="settings"
      />
      <LoadingOverlay visible={loading}  />
      <div style={{"display":"flex","flexDirection":"row"}}>
        <NavbarSimple 
          user={user}
          
        />
        <div>
        {invalid && <Container id="invalid" size={800} my={80}>
            <Title  
                align="center"
                sx={(theme) => ({
                fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                fontWeight: 900,
                })}
            >
                Invalid Credentials
            </Title>
        </Container>}
        {serverError && <Container id="servererror" size={800} my={80}>
            <Title
                align="center"
                sx={(theme) => ({
                fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                fontWeight: 900,
                })}
            >
                Server Error
            </Title>
        </Container>}
        {password && <Container id="passwordchange" size={800} my={80}>
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
        </Container>}
  
        {voice && <Container id="voiceregistration" size={800} my={80}>
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
              I enjoy listening to music in my free time.What is the weather like
              today?
            </div>
            <Group position="apart" mt="lg"></Group>
            <Button fullWidth mt="xl" size="md" onClick={getVoice} color="indigo">
              Start
            </Button>
  
            <Button fullWidth mt="xl" size="md" onClick={stopRecording} color="red">
              Stop Recording
            </Button>
            
          </Paper>
        </Container>
        }
        {calendar && <>
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
  
            <Paper withBorder shadow="md" p={30} mt={30} radius="md"  style={{"display":"flex","flexDirection":"column","justifyContent":"center","alignItems":"center"}}>
                      <Button id="googleCalendar" onClick={googleAuth}>Google calendar</Button>
            </Paper>
          </Container>
            </>
            }
        {!loading
            // display user deatails
            && <Container id="userdetails" size={800} my={80}>
                    <Title
                        align="center"
                        sx={(theme) => ({
                            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                            fontWeight: 900,
                        })}
                    >
                        User Details
                    </Title>
                    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                        <Text>Name: {user.name}</Text>
                        <Text>Email: {user.email}</Text>
                        <Text>Role: {user.role}</Text>
                        <Text>Company Name: {user.company.name}</Text>
                        <Text>Company Email: {user.company.email}</Text>
                    </Paper>
                </Container>
        }
        </div>
      </div>
      </>
    );
  }
  