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
import styles from "../styles/Settings.module.css"
  
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
    const [display,setDisplay] = useState("Account Details")
    const [passError,setPassError] = useState(false);
    const [passComplete,setPassComplete] = useState(false);
    const [pending,setPending] = useState([]);

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
                    setPending(["Google Calendar","Voice Recording","Password Change"])
                  }
                  else if(user.googleCalendar === "" && user.password_change === ""){
                    showCalendar(true)
                    showPassword(true)
                    setPending(["Google Calendar","Password Change"])
                  }
                  else if(user.googleCalendar === "" && user.voice_rec === ""){
                    showCalendar(true)
                    showVoice(true)
                    setPending(["Google Calendar","Voice Recording"])
                  }
                  else if(user.password_change === "" && user.voice_rec===""){
                    showPassword(true)
                    showVoice(true)
                    setPending(["Password Change","Voice Recording"])
                  }
                  else if( user.password_change === ""){
                    showPassword(true)
                    setPending(["Password Change"])
                  }
                  else if(user.voice_rec === ""){
                    showVoice(true)
                    setPending(["Voice Recording"])
                  }
                  else if(user.googleCalendar === ""){
                    showCalendar(true)
                    setPending(["Google Calendar"])
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
          if(data.message === "Invalid credentials"){
            setPassError(true)
          }else if(data.message==="Password change successful"){
            showPassword(false)
            setPassComplete(true)
            setPending(pending.filter((item)=>item!=="Password Change"))
          }
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
      setPending(pending.filter((item)=>item!=="Voice Recording"))
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
  
    return (
      <>
      <Navbar 
        type="settings"
      />
      <LoadingOverlay visible={loading}  />
      <div style={{"display":"flex","flexDirection":"row"}}>
        <NavbarSimple 
          user={user}
          setDisplay={setDisplay}
          pending={pending}
        />
        <div className={styles.settingsRight}>
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
        {(display==="Change Password") && <Container id="passwordchange" size={800} my={80}>
          <Title
            align="center"
            sx={(theme) => ({
              fontFamily: `Greycliff CF, ${theme.fontFamily}`,
              fontWeight: 900,
            })}
          >
            Change Password
          </Title>
          {!passComplete ?<>
            {!passError ? <></> : <Text color="red" align="center">Invalid credentials</Text>}
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
            </>
            :
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
              <Text align="center">Password changed successfully</Text>
            </Paper>
          }
        </Container>}
  
        {(display === "Voice Recording" )&& <Container id="voiceregistration" size={800} my={80}>
          <Title
            align="center"
            sx={(theme) => ({
              fontFamily: `Greycliff CF, ${theme.fontFamily}`,
              fontWeight: 900,
            })}
          >
            Voice Registration
          </Title>
          {
            !voice ?
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
              <Text align="center">You have already registered your voice....</Text>
            </Paper>
             : 
             <><Text align="center">You have not registered your yet</Text>
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
            </>
          }
        </Container>
        }
        {(display === "Google Calender" ) && <>
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
        {calendar ? <>
            <Paper withBorder shadow="md" p={30} mt={30} radius="md"  style={{"display":"flex","flexDirection":"column","justifyContent":"center","alignItems":"center"}}>
                <Button id="googleCalendar" onClick={googleAuth}>Google calendar</Button>
            </Paper>
            </>
            :
            <>
            <Paper withBorder shadow="md" p={30} mt={30} radius="md"  style={{"display":"flex","flexDirection":"column","justifyContent":"center","alignItems":"center"}}>
                <Text>You have already registered your google calendar</Text>
            </Paper>
            </>
          }
          </Container>
      </>}
        {!loading && display === "Account Details" 
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
                        <Text>Name: <Text sx={{fontWeight:500}}>{user.name}</Text></Text>
                        <Text>Email: <Text sx={{fontWeight:500}}>{user.email}</Text></Text>
                        <Text>Role: <Text sx={{fontWeight:500}}>{user.role}</Text></Text>
                        <Text>Company Name: <Text sx={{fontWeight:500}}>{user.company.name}</Text></Text>
                        <Text>Company Email: <Text sx={{fontWeight:500}}>{user.company.email}</Text></Text>
                    </Paper>
                </Container>
        }
        </div>
      </div>
      </>
    );
  }
  