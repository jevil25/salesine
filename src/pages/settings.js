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
  Input,
} from "@mantine/core";
import { ApideckVault } from "@apideck/vault-js";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ro } from "@faker-js/faker";
import Navbar from "../components/Navbar";
import { NavbarSimple } from "../components/SettingSideBar";
import styles from "../styles/Settings.module.css";
import { Modal } from "@mantine/core";
import { CLIENT_STATIC_FILES_RUNTIME_REACT_REFRESH } from "next/dist/shared/lib/constants";

export default function advance_register() {
  const router = useRouter();
  const BACK_END_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";
  const APIDECK_API_KEY = process.env.APIDECK_API_KEY;
  const APIDECK_APP_ID = process.env.APIDECK_APP_ID
  const [oldpassword, setoldpass] = useState("");
  const [newpassword, setnewpass] = useState("");
  const [email, setEmail] = useState("");
  const [stream, setStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [calendar, showCalendar] = useState(false);
  const [password, showPassword] = useState(false);
  const [voice, showVoice] = useState(false);
  const [loading, setLoading] = useState(true);
  const [invalid, setIvalid] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [user, setUser] = useState({});
  const [display, setDisplay] = useState("Account Details");
  const [passError, setPassError] = useState(false);
  const [passComplete, setPassComplete] = useState(false);
  const [pending, setPending] = useState([]);
  const [meetId, setMeetId] = useState("");
  const [meetPassword, setMeetPassword] = useState("");
  const [meetDate, setMeetDate] = useState("");
  const [meetTime, setMeetTime] = useState("");
  const [meetDuration, setMeetDuration] = useState("");
  const [topic, setTopic] = useState("");
  const [msg,setMsg] = useState("")
  const [send,setSend] = useState(false)
  const [refresh,setRefrsh] = useState(false)
  const downloadUrl = "https://drive.google.com/uc?id=18pywIGzS3fzzW8WxrjOXiUcS1SvwmPMq&export=download" 
  const fileName="Salesine.exe"

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
        console.log(data);
        setLoading(false);
        if (data.message === "Email not found.") {
          setIvalid(true);
        } else if (data.message === "Failed to retrieve recordings") {
          setServerError(true);
        } else {
          const user = data.user;
          setUser(user);
          if (user.role === "SUPERADMIN") {
          } else if (
            user.voice_rec === "" &&
            user.password_change === "" &&
            user.googleCalendar === ""
          ) {
            showCalendar(true);
            showVoice(true);
            showPassword(true);
            setPending([
              "Google Calendar",
              "Voice Recording",
              "Password Change",
            ]);
          } else if (
            user.googleCalendar === "" &&
            user.password_change === ""
          ) {
            showCalendar(true);
            showPassword(true);
            setPending(["Google Calendar", "Password Change"]);
          } else if (user.googleCalendar === "" && user.voice_rec === "") {
            showCalendar(true);
            showVoice(true);
            setPending(["Google Calendar", "Voice Recording"]);
          } else if (user.password_change === "" && user.voice_rec === "") {
            showPassword(true);
            showVoice(true);
            setPending(["Password Change", "Voice Recording"]);
          } else if (user.password_change === "") {
            showPassword(true);
            setPending(["Password Change"]);
          } else if (user.voice_rec === "") {
            showVoice(true);
            setPending(["Voice Recording"]);
          } else if (user.googleCalendar === "") {
            showCalendar(true);
            setPending(["Google Calendar"]);
          }
        }
      });
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
        if (data.message === "Invalid credentials") {
          setPassError(true);
        } else if (data.message === "Password change successful") {
          showPassword(false);
          setPassComplete(true);
          setPending(pending.filter((item) => item !== "Password Change"));
        }
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
  const integrateCrm = async () => {
    console.log("inside integrate function")

    let resp = await fetch(`${BACK_END_URL}/crm`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        flag:"crmauth"
      }),
    }).then((res)=>res.json())
    console.log(resp)
    ApideckVault.open({
      token: resp.data.data.session_token,
      unifiedApi: 'crm',
    })
  };

  useEffect(() => {
    fetch(`${BACK_END_URL}/admin/getTracker`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: localStorage.getItem('email') })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if (data.status === false) {
        console.log(data.message)
        return;
      }
      setTrackers(data.tracker.trackers)
    })
  }, [refresh])

  const [trackers, setTrackers] = useState([]);
  const [trackerName, setTrackerName] = useState('');
  const [trackersLimit, setTrackersLimit] = useState(false);
  const [trackersSent, setTrackersSent] = useState([]);
  const [addTrackerModal, setAddTrackerModal] = useState(false);
  const addTrackerToList = () => {
    //check length is 10
    if(trackers.length === 10) {
      setTrackersLimit(true)
      return;
    }
    setTrackers([...trackers, trackerName])
    console.log(trackers)
    setTrackerName('')
  }
  const addTracker = () => {
    fetch(`${BACK_END_URL}/admin/addtracker`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: localStorage.getItem('email'), trackerName: trackersSent })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setTrackersSent([])
      setAddTrackerModal(false)
      location.reload();
    })
  }

  const [addTrackerMsg, setAddTrackerMsg] = useState(false);
  const trac = ["Money","Planning","Budget","Time","Sales","Marketing","Product","Service","Deal","Team"];
  const addDefaultTrackers = () => {
    fetch(`${BACK_END_URL}/admin/addtracker`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: localStorage.getItem('email'), trackerName: trac })
    })
    .then(res => res.json())
    .then(data => {
      setTrackersSent([])
      setAddTrackerModal(false)
      setAddTrackerMsg(true);
      setRefrsh(!refresh)
    })
  }

  const [msg1,setMsg1] = useState("");
  const [zoomLink,setZoomLink] = useState("");
  const uploadCall = async () => {
    // if(meetId === "" || meetPassword === "" || meetDate === "" || meetTime === "" || meetDuration === ""){
    //   setIvalid(true)
    //   return
    // }
    setIvalid(false)
    // date is in format YYYY-MM-DD chnage it to DD-MM-YYYY
    let date = meetDate.split("-")
    let newDate = date[2]+"-"+date[1]+"-"+date[0]
    let formData = new FormData()
    formData.append("meetId",meetId)
    formData.append("meetPassword",meetPassword)
    formData.append("meetDate",newDate)
    formData.append("meetTime",meetTime)
    formData.append("meetDuration",meetDuration)
    formData.append("email",email)
    formData.append("file",document.querySelector("input[type=file]").files[0])
    formData.append("topic",topic);
    setSend(true);
    setMsg1("Uploading Call.... dont refresh the page or close the tab this may take some time depending on the size of the file")
    let resp = await fetch(`${BACK_END_URL}/uploadCall`,{
      method:"POST",
      body:formData
    }).then((res)=>res.json()).then((data)=>{
      console.log(data)
      if(data.status){
        setIvalid(true)
        setMsg("Call Uploaded Successfully")
      }else{
        setIvalid(true)
        setMsg(data.message)
      }
    })
  }

  const uploadCallZoom = async () => {
     if(meetId === "" || meetPassword === "" || meetDate === "" || meetTime === "" || meetDuration === "" || zoomLink === ""){
        setIvalid(true)
        return
      }
      setIvalid(false)
      // date is in format YYYY-MM-DD chnage it to DD-MM-YYYY
      let date = meetDate.split("-")
      let newDate = date[2]+"-"+date[1]+"-"+date[0]
      let formData = new FormData()
      formData.append("meetId",meetId)
      formData.append("meetPassword",meetPassword)
      formData.append("meetDate",newDate)
      formData.append("meetTime",meetTime)
      formData.append("meetDuration",meetDuration)
      formData.append("email",email)
      formData.append("zoomLink",zoomLink)
      formData.append("topic",topic);
      setSend(true);
      setMsg1("Verifying Details.... dont refresh the page or close the tab this may take some time depending on the size of the file");
      let resp = await fetch(`${BACK_END_URL}/uploadCallZoom`,{
        method:"POST",
        body:formData
      }).then((res)=>res.json()).then((data)=>{
        console.log(data)
        if(data.status){
          setIvalid(true)
          setMsg("Call Uploaded Successfully")
        }else{
          setIvalid(true)
          setMsg(data.message)
        }
      })
  }
  return (
    <>
      <Navbar type="settings" />
      <LoadingOverlay visible={loading} />
      <div className={styles.settings}>
        <NavbarSimple user={user} setDisplay={setDisplay} pending={pending} />
        <div className={styles.settingsRight}>
          {invalid && (
            <Container id="invalid" size={800} my={80}>
              <Title
                align="center"
                sx={(theme) => ({
                  fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                  fontWeight: 900,
                })}
              >
                Invalid Credentials
              </Title>
            </Container>
          )}
          {serverError && (
            <Container id="servererror" size={800} my={80}>
              <Title
                align="center"
                sx={(theme) => ({
                  fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                  fontWeight: 900,
                })}
              >
                Server Error
              </Title>
            </Container>
          )}
          {display === "Password Change" && (
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
              {!passComplete ? (
                <>
                  {!passError ? (
                    <></>
                  ) : (
                    <Text color="red" align="center">
                      Invalid credentials
                    </Text>
                  )}
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
              ) : (
                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                  <Text align="center">Password changed successfully</Text>
                </Paper>
              )}
            </Container>
          )}

          {display === "Voice Recording" && (
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
              {!voice ? (
                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                  <Text align="center">
                    You have already registered your voice....
                  </Text>
                </Paper>
              ) : (
                <>
                  <Text align="center">You have not registered your yet</Text>
                  <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    Press the start button and repeat the sentence into your
                    microphone
                    <br />
                    <div
                      style={{
                        backgroundColor: "wheat",
                        marginTop: "20px",
                        padding: "10px",
                      }}
                    >
                      I enjoy listening to music in my free time.What is the
                      weather like today?
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
                </>
              )}
            </Container>
          )}
          {display === "Google Calendar" && (
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
                {calendar ? (
                  <>
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
                  </>
                ) : (
                  <>
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
                      <Text>
                        You have already registered your google calendar
                      </Text>
                    </Paper>
                  </>
                )}
              </Container>
            </>
          )}
          {display === "CRM Integration" && (
            <>
              <Container id="voiceregistration" size={800} my={80}>
                <Title
                  align="center"
                  sx={(theme) => ({
                    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                    fontWeight: 900,
                  })}
                >
                  CRM Integration
                </Title>
                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                  <div
                    className={styles.crm}
                  >
                    <Text style={{ whiteSpace: "nowrap" }} align="center">
                      Integrate your desired CRM with Salesine
                    </Text>
                    <Button
                      fullWidth
                      mt="sm"
                      size="sm"
                      color="indigo"
                      onClick={integrateCrm}
                    >
                      Integrate
                    </Button>
                  </div>
                </Paper>
              </Container>
            </>
          )}
          {display === "Trackers" && (
            <>
              <Container id="voiceregistration" size={800} my={80}>
                <Title
                  align="center"
                  sx={(theme) => ({
                    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                    fontWeight: 900,
                  })}
                >
                  Trackers
                </Title>
                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <div style={{textAlign:"center"}}>
                  <Button variant='outline' onClick={() => setAddTrackerModal(true)}>
                    Add Trackers
                  </Button>
                  <div className={styles.trackers}>
                    {trac.map((tracker) => (
                      <li>{tracker}</li>
                    ))}
                    <Button color="green" onClick={() => addDefaultTrackers()}>Add This Template</Button>
                  </div>
                  {addTrackerMsg && <div style={{color:"green"}}>Trackers Added Successfully</div>}
                </div>
                </Paper>
              </Container>
            </>
          )}
          {!loading && display === "Account Details" && (
            // display user deatails
            <Container id="userdetails" size={800} my={80}>
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
                <Text>
                  Name: <Text sx={{ fontWeight: 500 }}>{user.name}</Text>
                </Text>
                <Text>
                  Email: <Text sx={{ fontWeight: 500 }}>{user.email}</Text>
                </Text>
                <Text>
                  Role: <Text sx={{ fontWeight: 500 }}>{user.role}</Text>
                </Text>
                <Text>
                  Company Name:{" "}
                  <Text sx={{ fontWeight: 500 }}>{user.company.name}</Text>
                </Text>
                <Text>
                  Company Email:{" "}
                  <Text sx={{ fontWeight: 500 }}>{user.company.email}</Text>
                </Text>
              </Paper>
            </Container>
          )}
          {
            display === "Download App" && (
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
                    className={styles.crm}
                  >
                    <Text style={{ whiteSpace: "nowrap" }} align="center">
                      Download the companion Salesine Desktop App
                    </Text>
                    <Link href={downloadUrl} download style={{textDecoration:"none"}}>
                      <Button
                        fullWidth
                        mt="sm"
                        size="sm"
                        color="indigo"
                      >
                        Download
                      </Button>
                    </Link>
                </div>
              </Paper>
            </Container>
            )
          }
          { display === "Upload Calls" && 
            (
              <Container id="uploadcalls" size={800} my={80}>
                <Title
                  align="center"
                  sx={(theme) => ({
                    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                    fontWeight: 900,
                  })}
                >
                  Upload Calls
                </Title>
                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                  <div style={{display:"flex",flexDirection:"column",gap:"20px"}}>
                    <Text>Enter Topic</Text>
                    <Input placeholder="Enter Meet Id" onChange={e => setTopic(e.target.value)} />
                    <Text>Enter Meet Id</Text>
                    <Input placeholder="Enter Meet Id" onChange={e => setMeetId(e.target.value)} />
                    <Text>Enter Meet Password</Text>
                    <Input placeholder="Enter Meet Password" onChange={e => setMeetPassword(e.target.value)} />
                    <Text>Enter Meet Date(DD-MM-YYYY)</Text>
                    <Input type="date" placeholder="Enter Meet Date" onChange={e => setMeetDate(e.target.value)} />
                    <Text>Enter Meet Time(24hour format 00:00 to 23:59)</Text>
                    <Input type="time" placeholder="Enter Meet Time" onChange={e => setMeetTime(e.target.value)}  />
                    <Text>Enter Meet Duration(In mins)</Text>
                    <Input placeholder="Enter Meet Duration" onChange={e => setMeetDuration(e.target.value)} />
                    <Text>Upload Call Video Recording</Text>
                    <Input type="file" />
                    {invalid && <Text color="red" align="center">{msg}</Text>}
                    {send && <Text color="red" align="center">{msg1}</Text>}
                    <Button color="indigo" onClick={() => {uploadCall()}}>Upload Call</Button>
                  </div>
                </Paper>
              </Container>
              )
          }
          { display === "Upload Calls Zoom" && 
            (
              <Container id="uploadcalls" size={800} my={80}>
                <Title
                  align="center"
                  sx={(theme) => ({
                    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                    fontWeight: 900,
                  })}
                >
                  Upload Calls
                </Title>
                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                  <div style={{display:"flex",flexDirection:"column",gap:"20px"}}>
                    <Text>Enter Topic</Text>
                    <Input placeholder="Enter Meet Id" onChange={e => setTopic(e.target.value)} />
                    <Text>Enter Meet Id</Text>
                    <Input placeholder="Enter Meet Id" onChange={e => setMeetId(e.target.value)} />
                    <Text>Enter Meet Password</Text>
                    <Input placeholder="Enter Meet Password" onChange={e => setMeetPassword(e.target.value)} />
                    <Text>Enter Meet Date(DD-MM-YYYY)</Text>
                    <Input type="date" placeholder="Enter Meet Date" onChange={e => setMeetDate(e.target.value)} />
                    <Text>Enter Meet Time(24hour format 00:00 to 23:59)</Text>
                    <Input type="time" placeholder="Enter Meet Time" onChange={e => setMeetTime(e.target.value)}  />
                    <Text>Enter Meet Duration(In mins)</Text>
                    <Input placeholder="Enter Meet Duration" onChange={e => setMeetDuration(e.target.value)} />
                    <Text>Enter zoom public video link</Text>
                    <Input placeholder="Enter zoom public video link" onChange={e => setZoomLink(e.target.value)} />
                    {invalid && <Text color="red" align="center">{msg}</Text>}
                    {send && <Text color="red" align="center">{msg1}</Text>}
                    <Button color="indigo" onClick={() => {uploadCallZoom()}}>Upload Call</Button>
                  </div>
                </Paper>
              </Container>
              )
          }
        </div>
      </div>
      {
              addTrackerModal && (
                <Modal opened={addTrackerModal} onClose={() => setAddTrackerModal(false)} title="Add Trackers" size="md">
                  <Input placeholder='Enter Tracker Name' value={trackerName} onChange={e => setTrackerName(e.target.value)} style={{marginBottom:"20px"}} />
                  {trackersLimit && <div style={{color:"red"}}>You can add only 10 trackers</div>}
                  <Button onClick={() => addTrackerToList()} style={{marginRight:"20px"}}>Add</Button>
                  {trackers.map((tracker) => (
                      <div style={{display:"flex",flexDirection:"row",gap:"10px",margin:"10px 0px 10px 0px"}}>
                        <Checkbox
                          value={tracker}
                          onChange={(event) => {
                            const isChecked = event.currentTarget.checked;
                            const checkboxValue = event.currentTarget.value;
                            setTrackersSent((prevSelected) => {
                              if (isChecked) {
                                // Add the value to the selected array if it's checked
                                return [...prevSelected, checkboxValue];
                              } else {
                                // Remove the value from the selected array if it's unchecked
                                return prevSelected.filter((value) => value !== checkboxValue);
                              }
                            });
                          }
                        }
                        />
                        {tracker}
                      </div>
                    ))}
                    <Button onClick={() => addTracker()}>
                      Done
                    </Button>
                </Modal>)}
    </>
  );
}
