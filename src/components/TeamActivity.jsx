import React, { useEffect, useState } from 'react';
import styles from '../styles/TeamActivity.module.css';

const TeamsActivity = ({ calls }) => {
  const [flag,setFlag] = useState(false);
  const [nameId,setNameId] = useState({});
  const [activityName, setActivityName] = useState({
    callDuration: true,
    weeklyVolume: false,
    weeklyDuration: false,
    totalVolume: false,
    totalDuration: false,
  });

  //get duration and startTime from calls array
  const callDetails = calls.map((call) => ({
    duration: call.duration,
    startTime: call.startTime,
    meetHostId: call.meetHostId,
  }));

  function abs(num) {
    return Math.abs(num);
  }
  function getCall(callDetails){
  //for same meetHostId, add duration and take average
  const callDetails1 = callDetails.reduce((acc, curr) => {
      if (acc[curr.meetHostId]) {
        acc[curr.meetHostId].duration += abs(curr.duration);
        acc[curr.meetHostId].count += 1;
      } else {
        acc[curr.meetHostId] = {
          duration: curr.duration,
          startTime: curr.startTime,
          count: 1,
        };
      }
      return acc;
    }, {});
    //make array of count and id
    const count = Object.entries(callDetails1).map(([key, value]) => ({
      count: value.count,
      id: key,
    }));
    //take average
    for (let key in callDetails1) {
      callDetails1[key].duration = callDetails1[key].duration / callDetails1[key].count;
    }
    //convert object to array
    const callDetails2 = Object.entries(callDetails1).map(([key, value]) => ({
      name: key,
      duration: value.duration,
      startTime: value.startTime,
    }));
    console.log(callDetails2);
    return [callDetails2,count];
  }
  const [callDetails2,callDetailsCount] = getCall(callDetails);
  //get user name of name from callDetails2
  useEffect(() => {
    if(!flag)
      callDetails2.map((member) => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getUserDetailsById`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: member.name
          })
        }).then(res => res.json())
        .then(data => {
          if(data.status===true){
            setNameId((prevState) => ({
              ...prevState,
              [member.name]: data.user.name
            }))
            setFlag(true);
          }
        }
        ).catch(err => {
          console.log(err)
        })
    })
  }, [callDetails2])
  console.log(nameId);
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
  //filter calls based on week
  const week = calls.filter((call) => {
    const date = parseDateManually(call.startTime);
    const today = new Date();
    const oneWeekAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    console.log(date>oneWeekAgo);
    return date > oneWeekAgo;
  });
  // console.log(week);
  const [weekCalls,weekCallsCount] = getCall(week);
  console.log(weekCalls);

  // Function to calculate total duration from the array of call details
function getTotalDuration(callDetails) {
  let totalDuration = 0;

  for (const call of callDetails) {
    // Assuming duration is in seconds
    totalDuration += parseInt(call.duration); 
  }
  return totalDuration;
}

function getTotalCount(callDetails) {
  let totalCount = 0;

  for (const call of callDetails) {
    totalCount += parseInt(call.count);
  }
  return totalCount;
}

  return (
    <div className={styles.activityWrapper}>
      <div className={styles.activityWrapperHead}>
        <div
          className={activityName.callDuration ? styles.change : styles.activityWrapperHeadName}
          onClick={() =>
            setActivityName({
              callDuration: true,
              weeklyVolume: false,
              weeklyDuration: false,
              totalVolume: false,
              totalDuration: false,
            })
          }
        >
          CALL DURATION
        </div>
        <div
          className={activityName.weeklyVolume ? styles.change : styles.activityWrapperHeadName}
          onClick={() =>
            setActivityName({
              callDuration: false,
              weeklyVolume: true,
              weeklyDuration: false,
              totalVolume: false,
              totalDuration: false,
            })
          }
        >
          WEEKLY CALL VOLUME
        </div>
        <div
          className={activityName.weeklyDuration ? styles.change : styles.activityWrapperHeadName}
          onClick={() =>
            setActivityName({
              callDuration: false,
              weeklyVolume: false,
              weeklyDuration: true,
              totalVolume: false,
              totalDuration: false,
            })
          }
        >
          WEEKLY CALL DURATION
        </div>
        <div
          className={activityName.totalVolume ? styles.change : styles.activityWrapperHeadName}
          onClick={() =>
            setActivityName({
              callDuration: false,
              weeklyVolume: false,
              weeklyDuration: false,
              totalVolume: true,
              totalDuration: false,
            })
          }
        >
          TOTAL CALL VOLUME
        </div>
        <div
          className={activityName.totalDuration ? styles.change : styles.activityWrapperHeadName}
          onClick={() =>
            setActivityName({
              callDuration: false,
              weeklyVolume: false,
              weeklyDuration: false,
              totalVolume: false,
              totalDuration: true,
            })
          }
        >
          TOTAL CALL DURATION
        </div>
      </div>
      <div className={styles.activityWrapperData}>
        {activityName.callDuration && (
          <div className={styles.activityWrapperCallDuration}>
            <div className={styles.callDurationInfo}>
              <div className={styles.callDurationInfoHead}>Call Duration</div>
              <div className={styles.callDurationInfoSub}>Based on {calls.length} calls</div>
            </div>
            <div className={styles.callDurationGraph}>
              <div className={styles.graphLabel}>Team Members</div>
              <div className={styles.barGraph}>
                {callDetails2.map((member) => (<>
                  <div className={styles.graph}>
                    <div className={styles.graphName}>{nameId[member.name]}</div>
                  </div>
                  <div className={styles.graph}>
                    <div className={`${styles.graphData}`} style={{"width":`${400*member.duration/getTotalDuration(callDetails2)}px`}}></div>{member.duration.toFixed(2)} mins
                  </div>
                  </>))}
              </div>
            </div>
          </div>
        )}
        {activityName.weeklyVolume && (
          <div className={styles.activityWrapperCallDuration}>
            <div className={styles.callDurationInfo}>
              <div className={styles.callDurationInfoHead}>Weekly Call Volume</div>
              <div className={styles.callDurationInfoSub}>Based on {calls.length} calls</div>
            </div>
            <div className={styles.callDurationGraph}>
              <div className={styles.graphLabel}>Team Members</div>
              <div className={styles.barGraph}>
              {weekCallsCount.map((member) => (<>
                  <div className={styles.graph}>
                    <div className={styles.graphName}>{nameId[member.id]}</div>
                  </div>
                  <div className={styles.graph}>
                  <div className={`${styles.graphData}`} style={{"width":`${400*member.count/getTotalCount(weekCallsCount)}px`}}></div>{member.count}
                  </div>
                  </>))}
              </div>
            </div>
          </div>
        )}
        {activityName.weeklyDuration && (
          <div className={styles.activityWrapperCallDuration}>
            <div className={styles.callDurationInfo}>
              <div className={styles.callDurationInfoHead}>Weekly Call Duration</div>
              <div className={styles.callDurationInfoSub}>Based on {calls.length} calls</div>
            </div>
            <div className={styles.callDurationGraph}>
              <div className={styles.graphLabel}>Team Members</div>
              <div className={styles.barGraph}>
              {weekCalls.map((member) => (<>
                  <div className={styles.graph}>
                    <div className={styles.graphName}>{nameId[member.name]}</div>
                  </div>
                  <div className={styles.graph}>
                    <div className={`${styles.graphData}`} style={{"width":`${400*member.duration/getTotalDuration(weekCalls)}px`}}></div>{member.duration.toFixed(2)} mins
                  </div>
                  </>))}
              </div>
            </div>
          </div>
        )}
        {activityName.totalVolume && (
          <div className={styles.activityWrapperCallDuration}>
            <div className={styles.callDurationInfo}>
              <div className={styles.callDurationInfoHead}>Total Call Volume</div>
              <div className={styles.callDurationInfoSub}>Based on {calls.length} calls</div>
            </div>
            <div className={styles.callDurationGraph}>
              <div className={styles.graphLabel}>Team Members</div>
              <div className={styles.barGraph}>
              {callDetailsCount.map((member) => (<>
                  <div className={styles.graph}>
                    <div className={styles.graphName}>{nameId[member.id]}</div>
                  </div>
                  <div className={styles.graph}>
                  <div className={`${styles.graphData}`} style={{"width":`${400*member.count/getTotalCount(callDetailsCount)}px`}}></div>{member.count}
                  </div>
                  </>))}
              </div>
            </div>
          </div>
        )}
        {activityName.totalDuration && (
          <div className={styles.activityWrapperCallDuration}>
            <div className={styles.callDurationInfo}>
              <div className={styles.callDurationInfoHead}>Total Call Duration</div>
              <div className={styles.callDurationInfoSub}>Based on {calls.length} calls</div>
            </div>
            <div className={styles.callDurationGraph}>
              <div className={styles.graphLabel}>Team Members</div>
              <div className={styles.barGraph}>
              {callDetails2.map((member) => (<>
                  <div className={styles.graph}>
                    <div className={styles.graphName}>{nameId[member.name]}</div>
                  </div>
                  <div className={styles.graph}>
                    <div className={`${styles.graphData}`} style={{"width":`${(parseInt(member.duration)/getTotalDuration(callDetails2))*400}px`}}></div>{member.duration.toFixed(2)} mins
                  </div>
                  </>))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamsActivity;
