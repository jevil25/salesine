import React, { useState } from 'react';
import styles from '../styles/TeamActivity.module.css';

const TeamsActivity = () => {
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
              <div className={styles.callDurationInfoSub}>Based on 625 calls</div>
            </div>
            <div className={styles.callDurationGraph}>
              <div className={styles.graphLabel}>Team Members</div>
              <div className={styles.barGraph}>
                <div className={styles.graph}>
                  <div className={styles.graphName}>Name</div>
                  <div className={`${styles.graphData} ${styles.width50}`}></div>
                </div>
                {/* Repeat the same pattern for the remaining graphs */}
              </div>
            </div>
          </div>
        )}
        {/* Repeat the same pattern for the remaining activity panels */}
      </div>
    </div>
  );
};

export default TeamsActivity;
