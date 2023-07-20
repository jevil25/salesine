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

  useEffect(() => {
    if(!team.cdpercentage){
      for(let i=0;i<team.length;i++){
        //generate random percentage from 20 to 100
        team[i].cdpercentage = Math.floor(Math.random() * (100 - 20 + 1) + 20);
        console.log(team[i].cdpercentage)
        //generate random percentage from 0 to calls.length
        team[i].wvpercentage = Math.floor(Math.random() * (calls.length - 0 + 1) + 0);
        //generate random percentage from 20 to 100
        team[i].wdpercentage = Math.floor(Math.random() * (100 - 20 + 1) + 20);
        //generate random percentage from 0 to calls.length
        team[i].tvpercentage = Math.floor(Math.random() * (calls.length - 0 + 1) + 0);
        //generate random percentage from 20 to 100
        team[i].tdpercentage = Math.floor(Math.random() * (100 - 20 + 1) + 20);
      }
      setFlag(true)
    }
  }, [flag,team])

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
                {team.map((member) => (<>
                  <div className={styles.graph}>
                    <div className={styles.graphName}>{member.name}</div>
                  </div>
                  <div className={styles.graph}>
                    <div className={`${styles.graphData}`} style={{"width":`${3*member.cdpercentage}px`}}></div>{member.cdpercentage}%
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
