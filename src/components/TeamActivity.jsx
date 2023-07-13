import React, { useState } from 'react';
import styles from '../styles/TeamActivity.module.css';

const TeamsActivity = ({ team,calls }) => {
  const [activityName, setActivityName] = useState({
    callDuration: true,
    weeklyVolume: false,
    weeklyDuration: false,
    totalVolume: false,
    totalDuration: false,
  });


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
                {team.map((member) => (
                  <div className={styles.graph}>
                    <div className={styles.graphName}>{member.name}</div>
                    <div className={`${styles.graphData}`} style={{"width":"50px"}}></div>50%
                  </div>
                ))}
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
                {team.map((member) => (
                  <div className={styles.graph}>
                    <div className={styles.graphName}>{member.name}</div>
                    <div className={`${styles.graphData}`} style={{"width":"50px"}}></div>50%
                  </div>
                ))}
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
                {team.map((member) => (
                  <div className={styles.graph}>
                    <div className={styles.graphName}>{member.name}</div>
                    <div className={`${styles.graphData}`} style={{"width":"50px"}}></div>50%
                  </div>
                ))}
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
                {team.map((member) => (
                  <div className={styles.graph}>
                    <div className={styles.graphName}>{member.name}</div>
                    <div className={`${styles.graphData}`} style={{"width":"50px"}}></div>50%
                  </div>
                ))}
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
                {team.map((member) => (
                  <div className={styles.graph}>
                    <div className={styles.graphName}>{member.name}</div>
                    <div className={`${styles.graphData}`} style={{"width":"50px"}}></div>50%
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamsActivity;
