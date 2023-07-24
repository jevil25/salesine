import React, { useEffect } from 'react';
import msg from '../../public/assets/msg.png';
import styles from '../styles/Coaching.module.css';
import Image from 'next/image';
import { Button, Input, Loader, Modal } from '@mantine/core';
import { useRouter } from 'next/router';

export const feedback = [
  { starting: 'July', ending: 'August', num: 2 },
  { starting: 'July', ending: 'August', num: 1 },
  { starting: 'July', ending: 'August', num: 1 },
  { starting: 'July', ending: 'August', num: 1 },
  { starting: 'July', ending: 'August', num: 0 },
  { starting: 'July', ending: 'August', num: 3 },
];

const Coaching = (inuser) => {
  const router = useRouter();
  const [users, setUsers] = React.useState([]);
  const [meetHost, setMeetHost] = React.useState(false);
  const [feedback, setFeedback] = React.useState(false);
  const [lastFeedback, setLastFeedback] = React.useState(false);
  const [noFeedback, setNoFeedback] = React.useState(false);
  const [feedbackModal, setFeedbackModal] = React.useState(false);
  const [meetHostId, setMeetHostId] = React.useState(false);
  const [feedbackText, setFeedbackText] = React.useState("");
  const [invalidFeedback, setInvalidFeedback] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [role, setRole] = React.useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getCoaching`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: localStorage.getItem('email'),
      })
    }).then((res) => res.json())  
    .then((data) => {
      console.log(data);
      setUsers(data.data.users)
      setRole(localStorage.getItem("role"));
    })
    .catch((err) => {
      console.log(err);
    });
  }, [refresh]);

  const getMonth = (date) => {
    //13-07-2023T12:56:45
    let month = date.split('-')[1];
    month = month.split('-')[0];
    switch (month) {
      case '01':
        return 'Jan';
      case '02':
        return 'Feb';
      case '03':
        return 'Mar';
      case '04':
        return 'Apr';
      case '05':
        return 'May';
      case '06':
        return 'Jun';
      case '07':
        return 'Jul';
      case '08':
        return 'Aug';
      case '09':
        return 'Sep';
      case '10':
        return 'Oct';
      case '11':
        return 'Nov';
      case '12':
        return 'Dec';
    }
  };

  const numberOfLastMonthFeedback = (feedback) => {
    if(feedback.length === 0) return 0;
    let count = 0;
    let today = new Date();
    let lastMonth = today.getMonth() - 1;
    let lastYear = today.getFullYear();
    if(lastMonth === -1) {
      lastMonth = 11;
      lastYear = lastYear - 1;
    }
    feedback.forEach((f) => {
      let date = new Date(f.updatedAt);
      if(date.getMonth() === lastMonth+1 && date.getFullYear() === lastYear) {
        count++;
      }
    });
    return count;
  }

  function parseDateManually(dateString) {
    // Split the date and time parts
    const [datePart, timePart] = dateString.split('T');
  
    // Split the date part into day, month, and year components
    const [day, month, year] = datePart.split('-');
  
    // Split the time part into hours, minutes, and seconds components
    const [hours, minutes, seconds] = timePart.split(':');
  
    // Create a Date object with the components
    const dateObject = new Date(year, month - 1, day, hours, minutes, seconds);
    console.log(dateObject);
    return dateObject;
  }

  const getLastFeedback = (user) => {
    const feedback = user.feedback;
    setLastFeedback(true)
    setMeetHost(user.name)
    setMeetHostId(user.id)
    if(feedback.length === 0) {
      setNoFeedback(true);
      return;
    }
    setNoFeedback(false);
    //from all feedback updateAt get the most recent one
    let max = 0;
    let index = 0;
    for(let i = 0; i < feedback.length; i++) {
      let date = new Date(feedback[i].updatedAt);
      // console.log(date);
      if(date.getTime() > max) {
        max = date.getTime();
        index = i;
      }
    }
    setFeedback(feedback[index]);
  }

  const getThisMonthMeetLength = (meeting) => {
    let count = 0;
    let today = new Date();
    let thisMonth = today.getMonth();
    let thisYear = today.getFullYear();
    meeting.forEach((m) => {
      let date = parseDateManually(m.startTime);
      // console.log(date);
      if(date.getMonth() === thisMonth && date.getFullYear() === thisYear) {
        count++;
      }
    });
    // console.log(count);
    return count;
  }

  const addFeedback = () => {
    setLoader(true);
    if(feedbackText === "") {
      setLoader(false);
      setInvalidFeedback(true);
      return;
    }
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getCoaching/addFeedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: localStorage.getItem('email'),
        feedback: feedbackText,
        userId: meetHostId
      })
    }).then((res) => res.json())
    .then((data) => {
      console.log(data);
      if(data.status){
        setFeedbackText("");
        setLoader(false);
        setFeedbackModal(false);
        setRefresh(!refresh);
      }
    }
    ).catch((err) => {
      console.log(err);
    });
  }

  return (
    <div className={styles.coachingWrapper}>
      <div className={styles.coachingWrapperHeader}>Team Members</div>
      <div className={styles.coachingWrapperBody}>
        {users.map((user, i) => (
        inuser.inuser.id === user.id ?
          <div className={styles.coachingWrapperDiv} key={i} style={{position:"relative",left:"100px"}}>
            <div className={styles.DivTitle}>{user.name}</div>
            <div className={styles.DivLine}></div>
            <div className={styles.DivFeedback}>
              <div className={styles.DivFeedbackHead}>
                <div className={styles.DivFeedbackHeadName}>Feedback on calls (Past month)</div>
                <div className={styles.DivFeedbackHeadNum}>{numberOfLastMonthFeedback(user.feedback)}</div>
              </div>
              <div className={styles.DivFeedbackInfo}>
                <div className={styles.DivFeedbackInfoStarting}>{getMonth(user.meeting[0].startTime)}</div>
                <div className={styles.DivFeedbackInfoLines}>
                  <div className={styles.msgimg}>
                    {[...Array(getThisMonthMeetLength(user.meeting))].map((n, index) => (
                      <Image src={msg} key={index} alt="" />
                    ))}
                  </div>
                  <div className={styles.DivLine}></div>
                </div>
                <div className={styles.DivFeedbackInfoEnding}>{getMonth(user.meeting[user.meeting.length-1].startTime)}</div>
              </div>
            </div>
            <div className={styles.DivLine}></div>
            <div className={styles.DivFooter}>
              <div className={styles.coachingFooter}>Open Request</div>
              <div className={styles.coachingLine}></div>
              <div className={styles.coachingFooter} onClick={e => {
                localStorage.setItem("individual", user.email);
                router.push("/individual");
              }}>View Calls</div>
              <div className={styles.coachingLine}></div>
              <div className={styles.coachingFooter} onClick={e => getLastFeedback(user)}>Last Feedback</div>
            </div>
          </div>
          :<></>
        ))}
      </div>
      {lastFeedback && (
        <Modal onClose={() => setLastFeedback(false)} opened={lastFeedback} title={"Last Feedback"}>
          {role=="ADMIN" ? <Button onClick={e => {setLastFeedback(false); setFeedbackModal(true)}} style={{"padding":"10px 10px 10px"}}>Add Feedback</Button> : <></>}
          {
            noFeedback ?
            <div className={styles.feedbackTitle}>No feedbacks yet</div>
            :
            <>
            <div style={{display:"flex",justifyContent: "center",alignItems:"center",flexDirection:"column"}}>
              <div className={styles.feedbackBodyMain}>
                <div className={styles.feedbackDataBold}>Feedback</div>
                <div className={styles.feedbackDataBold}>Date</div>
              </div>
              <div className={styles.feedbackBody}>
                <div className={styles.feedbackData}>{feedback.feedback}</div>
                <div className={styles.feedbackData}>{new Date(feedback.updatedAt).toDateString()}</div>
              </div>
          </div>
          </>
        }
        </Modal>
      )}
      {feedbackModal && (
        <Modal onClose={() => setFeedbackModal(false)} opened={feedbackModal} title={"Feedback"}>
          <div className={styles.feedbackTitle}>Feedback for {meetHost}</div>
          <div className={styles.feedbackBody}>
            <Input  multiline placeholder="Feedback" style={{width:"100%",marginTop:"20px"}} onChange={e => setFeedbackText(e.target.value)}/>
            {
              invalidFeedback &&
              <div className={styles.invalidFeedback}>Please enter feedback</div>
            }
            <Button onClick={e => addFeedback()} style={{"padding":"10px 10px 10px",marginTop:"20px"}}>{loader ? <Loader style={{color:"white"}} />:"Send Feedback" }</Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Coaching;
