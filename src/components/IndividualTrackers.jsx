import React, { useEffect, useState } from 'react';
import ellipse from '../../public/assets/Ellipse.png';
import styles from '../styles/Trackers.module.css';
import {Pie} from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js'

const Trackers = ({ calls,trackers,user }) => {
    console.log(calls);

  trackers = trackers.filter((tracker) => tracker !== null);
  console.log(trackers);
  //get keys from trackers array having objects and some many have different keys check for unique keys
  const keys = trackers.map((tracker) => Object.keys(tracker));
  //flatten the array
  const uniqueKeys = [...new Set(keys.flat())];
  console.log(uniqueKeys);

  //find percentage of each key beginning in the trackers array
  const percentage = uniqueKeys.map((key) => {
    //filter the trackers array for each key
    const filteredTrackers = trackers.filter((tracker) => Object.keys(tracker).includes(key));
    //get the length of the filtered array
    const length = filteredTrackers.length;
    //get the percentage
    const percent = (length / trackers.length) * 100;
    //return the percentage
    return percent;
  });

  Chart.register(ArcElement);
  const data = []

  console.log(percentage);
    return (
      <div className={styles.trackersWrapper}>
        <div className={styles.trackersWrapperPart1}>
          <div className={styles.trackers1Header}>
            <div className={styles.trackers1HeaderHeading}>Trackers</div>
            <div className={styles.trackers1HeaderSub}>Percentage of calls where each tracker was detected (based on {trackers.length} calls)</div>
          </div>
          <div className={styles.trackers1Body}>
            {uniqueKeys.map((key, index) => {
              return (<div className={styles.trackers1BodyPart}>
                        <div className={styles.bodyPartPie}>
                            <div className={styles.graph} style={{"display":"flex","flexDirection":"row"}}>
                                <div className={styles.bodyPartName} style={{"width":"200px"}}>{key}</div>
                                <div className={`${styles.graphData}`} style={{"width":`${3*percentage[index]}px`}}></div>{percentage[index].toFixed(2)}%
                            </div>
                        </div>
                      </div>
                )
              })}
          </div>
        </div>
        <div className={styles.trackersWrapperPart2}>
          <div className={styles.trackers2Header}>
            <div className={styles.trackers2HeaderHeading}>Details</div>
          </div>
          <div className={styles.trackers2Body}>
            <div className={styles.trackers2BodyImg}>
              <img src={ellipse} alt="" />
            </div>
            <div className={styles.trackers2BodyDetails}>
              <div className={styles.trackers2BodyDetail}>Name :{user.name}</div>
              <div className={styles.trackers2BodyDetail}>Email :{user.email}</div>
              <div className={styles.trackers2BodyDetail}>Work :{user.role}</div>
              <div className={styles.trackers2BodyDetail}>Status :Active</div>
            </div>
            <div className={styles.trackers2BodyLine}></div>
            <div className={styles.trackers2BodyCalls}>
              <div className={styles.trackers2BodyCallsHead}>
                <div className={styles.trackers2BodyCallsHeader} style={{ color: '#3F51B5' }}>Last {calls.length} calls</div>
              </div>
              {calls.length > 0 ? calls.map((meeting) => {
                console.log(meeting);
              return <div className={styles.trackers2BodyCallsHead}>
                <div className={styles.trackers2BodyCallsHeader}>{meeting.Company.name}</div>
                <div className={styles.trackers2BodyCallsSub}>{meeting.topic}</div>
              </div>
              }) : <div className={styles.trackers2BodyCallsHead}>
                <div className={styles.trackers2BodyCallsHeader}>No calls to show</div>
              </div>}
              {/* <div className={styles.trackers2BodyCallsHead}>
                <div className={styles.trackers2BodyCallsHeader}>Conversation</div>
                <div className={styles.trackers2BodyCallsSub}>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil sed eum ipsa similique ducimus voluptas
                  labore odit, voluptatum architecto quam vel asperiores ipsum, et voluptatem quidem porro saepe odio.
                  Voluptates.
                </div>
              </div> */}
              {/* <div className={styles.trackers2BodyMore} style={{ color: 'rgba(63, 81, 181, 0.72)' }}>View 2 more ..</div> */}
            </div>
          </div>
        </div>
      </div>
    );
}

export default Trackers;
