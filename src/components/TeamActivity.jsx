import React, { useEffect, useState } from 'react';
import styles from '../styles/TeamActivity.module.css';

const TeamsActivity = ({ team,calls }) => {
  const [flag,setFlag] = useState(false);
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
  function parseDateManually(dateString) {
    // Split the date and time parts
    const [datePart, timePart] = dateString.split('T');
  
    // Split the date part into day, month, and year components
    const [day, month, year] = datePart.split('-');
  
    // Split the time part into hours, minutes, and seconds components
    const [hours, minutes, seconds] = timePart.split(':');
  
    // Create a Date object with the components
    const dateObject = new Date(year, month - 1, day, hours, minutes, seconds);
    return dateObject;
  }
  //filter calls based on week
  const week = callDetails2.filter((call) => {
    const date = parseDateManually(call.startTime);
    const today = new Date();
    const oneWeekAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    console.log(date>oneWeekAgo);
    return date > oneWeekAgo;
  });
  console.log(week);

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
                    <div className={styles.graphName}>{member.name}</div>
                  </div>
                  <div className={styles.graph}>
                    <div className={`${styles.graphData}`} style={{"width":`${3*member.cdpercentage}px`}}></div>{member.duration.toFixed(2)} mins
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
              {team.map((member) => (<>
                  <div className={styles.graph}>
                    <div className={styles.graphName}>{member.name}</div>
                  </div>
                  <div className={styles.graph}>
                  <div className={`${styles.graphData}`} style={{"width":`${100*member.wvpercentage/(calls.length)}px`}}></div>{member.wvpercentage}
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
              {team.map((member) => (<>
                  <div className={styles.graph}>
                    <div className={styles.graphName}>{member.name}</div>
                  </div>
                  <div className={styles.graph}>
                  <div className={`${styles.graphData}`} style={{"width":`${3*member.wdpercentage}px`}}></div>{member.wdpercentage}%
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
              {team.map((member) => (<>
                  <div className={styles.graph}>
                    <div className={styles.graphName}>{member.name}</div>
                  </div>
                  <div className={styles.graph}>
                  <div className={`${styles.graphData}`} style={{"width":`${100*(member.tvpercentage)/(calls.length)}px`}}></div>{member.tvpercentage}
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
              {team.map((member) => (<>
                  <div className={styles.graph}>
                    <div className={styles.graphName}>{member.name}</div>
                  </div>
                  <div className={styles.graph}>
                  <div className={`${styles.graphData}`} style={{"width":`${3*member.tdpercentage}px`}}></div>{member.tdpercentage}%
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
