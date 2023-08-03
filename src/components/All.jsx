import styles from "../styles/All.module.css";
import { Video } from "tabler-icons-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useRef } from "react";
import {
  Card,
  Group,
  Text,
  Badge,
  Paper,
  Modal,
  useMantineTheme,
  Button,
  MenuDropdown,
  Input,
  LoadingOverlay,
  Select,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const All = () => {
  const [calls, setCalls] = useState([]);
  const player = useRef();
  const [url, setUrl] = useState("");
  const [btn, setBtn] = useState(false);
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);
  const [recordings, setRecordings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dealsArr, setDealsarr] = useState([]);
  const BACK_END_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";
  // console.log("this is props var");
  // console.log(props);
  const router = useRouter();
  let obj = [];
  const {
    query: { code },
  } = router;

  const [selected, setSelected] = useState({
    date: true,
    duration: false,
  });

  const [syncCalls, setSyncCalls] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const initiateMeeting = () => {
    const data = axios
      .post(`${BACK_END_URL}/zoom`, {
        name: name,
        startTime: startTime,
        duration: duration,
        repeat: repeat,
        email: localStorage.getItem("email"),
      })
      .then((response) => {
        setUrl(response.data.join_url);
        setBtn(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formatDate = (date) => {
    const res = date.split("T");
    return res[0];
  };

  useEffect(() => {
    const getRecordings = async () => {
      let calenderUpdate = await fetch(`${BACK_END_URL}/calender`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: localStorage.getItem("email") }),
      })
        .then((res) => res.json())
        .then((calenderUpdate) => {
          console.log(calenderUpdate);
          return calenderUpdate;
        });
      let recordings = await fetch(`${BACK_END_URL}/recordings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: localStorage.getItem("email") }),
      })
        .then((res) => res.json())
        .then((recordings) => {
          console.log(recordings);
          return recordings.recordings;
        });
      setRecordings(recordings.reverse());
      setLoading(false);
    };

    const populateCalls = () => {
      axios
        .post(`${BACK_END_URL}/calls`, { email: localStorage.getItem("email") })
        .then((response) => {
          console.log(response.data);
          setCalls(response.data);
          console.log(calls);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const getOpportunities = async () => {
      let deals = await fetch(`${BACK_END_URL}/crm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: localStorage.getItem("email"),
          flag: "listopp",
        }),
      }).then((res) => res.json());
      // console.log(deals);
      let deals_arr = deals.data[0].data;
      // console.log(deals_arr);
      setDealsarr(deals_arr);
    };

    // populateCalls();
    getRecordings();
    getOpportunities();
  }, [refresh]);
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState("");
  const [repeat, setRepeat] = useState("");

  const joinHandler = () => {
    window.location.href = url;
  };

  const formatTime = (time) => {
    //in the format 2021-06-24T12:00
    let date = time.split("T")[0];
    let time1 = time.split("T")[1];
    let hour = time1.split(":")[0];
    let min = time1.split(":")[1];
    let res = hour + ":" + min;
    //retunr both date and time
    return res + " on " + date;
  };

  const handleDelete = (meetid) => {
    console.log(meetid);
    fetch(`${BACK_END_URL}/deleteMeet`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ meetid: meetid }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status) {
          setRefresh(!refresh);
        }
      });
  };

  const [addModal, setAddModal] = useState(false);
  const [meetId, setMeetId] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const handleAdd = (meetid) => {
    setAddModal(true);
    setMeetId(meetid);
  };

  const submitMember = () => {
    fetch(`${BACK_END_URL}/addMeetMember`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ meetid: meetId, name: name, role: role }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status) {
          setRefresh(!refresh);
          setAddModal(false);
        } else {
          setMsg("Could not add member");
        }
      });
  };

  const handleSelectChange = (dealId,meetId) => {
    console.log(dealId,meetId);
    let deal_meet_link = fetch(`${BACK_END_URL}/meetSelect`,{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dealId: dealId,meetId:meetId, email: localStorage.getItem("email") }),
    }).then((res)=>res.json()).then((res)=> console.log(res));
  }

  return (
    <div className={styles.allContainer}>
      <div className={styles.allContainerHeading}>
        <p>All Calls</p>
      </div>
      {/* <div className={styles.initiateButton}>
        <Button onClick={open} color="indigo">
          Initiate New Meeting
        </Button>
      </div> */}
      <div className={styles.allSortBy}>
        <div className={styles.allSortBy1}>Sort By</div>
        <div
          className={
            selected.date ? styles.allSort2Selected : styles.allSortBy2
          }
          style={{ cursor: "pointer" }}
          onClick={() =>
            setSelected({
              date: true,
              duration: false,
            })
          }
        >
          <div className={styles.allsortLine}></div>
          <div className={styles.allSortDate} style={{ paddingLeft: "20px" }}>
            Date
          </div>
        </div>
        <div
          className={
            selected.duration ? styles.allSort3Selected : styles.allSortBy3
          }
          style={{ cursor: "pointer" }}
          onClick={() =>
            setSelected({
              date: false,
              duration: true,
            })
          }
        >
          <div className={styles.allsortLine}></div>
          <div
            className={styles.allSortDuration}
            style={{ paddingLeft: "15px" }}
          >
            Call Duration
          </div>
        </div>
        <div styles={{ marginLeft: "10px" }}></div>
      </div>

      <div className={styles.allCalls}>
        {recordings.length > 0 ? (
          recordings.map((recording) => {
            return (
              <div className={styles.allCall} value={recording.id}  key={recording.id}>
                <div style={{ width: "50px" }}>
                  {" "}
                  <Video size={35} />{" "}
                </div>
                <div className={styles.allInfo}>
                  <div className={styles.allHeading}>{recording.topic}</div>
                  <div className={styles.allSubInfo}>
                    {formatTime(recording.startTime)}
                  </div>
                  <div className={styles.allSubInfo}>
                    {Math.abs(recording.duration)} mins
                  </div>
                </div>
                {recording.file.length > 0 ? (
                  recording.file[0].videoId ? (
                    <>
                      <Badge color="indigo">
                        <Text size="sm" weight={500}>
                          Completed
                        </Text>
                      </Badge>
                      <Button
                        color="indigo"
                        onClick={() => {
                          localStorage.setItem(
                            "recording",
                            JSON.stringify(recording.meetid)
                          );
                          router.push("/recording");
                        }}
                      >
                        Recording
                      </Button>
                    </>
                  ) : (
                    <>
                      <Badge color="red">
                        <Text size="sm" weight={500}>
                          Not Completed
                        </Text>
                      </Badge>
                      <Button
                        color="indigo"
                        onClick={() => {
                          localStorage.setItem(
                            "recording",
                            JSON.stringify(recording.meetid)
                          );
                          router.push("/recording");
                        }}
                        disabled={true}
                      >
                        Recording
                      </Button>
                    </>
                  )
                ) : (
                  <>
                    <Badge color="red">
                      <Text size="sm" weight={500}>
                        Not Completed
                      </Text>
                    </Badge>
                    <Button
                      color="indigo"
                      onClick={() => {
                        localStorage.setItem(
                          "recording",
                          JSON.stringify(recording.meetid)
                        );
                        router.push("/recording");
                      }}
                      disabled={true}
                    >
                      Recording
                    </Button>
                  </>
                )}

                <Button
                  color="red"
                  onClick={(e) => handleDelete(recording.meetid)}
                >
                  Delete
                </Button>
                <Button
                  color="indigo"
                  onClick={(e) => {
                    handleAdd(recording.meetid);
                  }}
                >
                  Add Participants
                </Button>
                <select
                  name="meetinput"
                  id="meetinput"
                  style={{ border: "none" }}
                  onChange={(event) => handleSelectChange(event.target.value,recording.id)}
                >
                <option value="">Add a meet</option>
                  { dealsArr.length>0 ? dealsArr.map((deal) => {
                    return (
                      <option key={deal.id} value={deal.id} rec_id={recording.id}>
                        {deal.title}
                      </option>
                    );
                  })
                  :null
                }
                </select>
              </div>
            );
          })
        ) : loading ? (
          <LoadingOverlay visible={loading} />
        ) : (
          <div className={styles.noCalls}>No Calls</div>
        )}
      </div>
      {addModal ? (
        <Modal opened={addModal} onClose={() => setAddModal(false)}>
          <Modal.Title style={{ textAlign: "center", margin: "10px" }}>
            Add Participants
          </Modal.Title>
          <Modal.Body>
            <Input
              placeholder="Enter Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
              style={{ marginBottom: "10px" }}
            />
            <Select
              label="Select Role"
              placeholder="Select Role"
              data={[
                { value: "president", label: "President" },
                { value: "secretary", label: "Secretary" },
                { value: "Vice President", label: "Vice President" },
                { value: "Cheif Officer", label: "Cheif Officer" },
              ]}
              searchable={false}
              style={{ marginBottom: "10px" }}
              onChange={(e) => {
                setRole(e);
              }}
            />
            {msg ? <div style={{ color: "red" }}>{msg}</div> : null}
            <Button onClick={submitMember} color="indigo">
              Add
            </Button>
          </Modal.Body>
        </Modal>
      ) : null}
    </div>
  );
};

export default All;
