import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import ellipse from '../../public/assets/Ellipse.png';
import styles from '../styles/Trackers.module.css';

const data = {
  labels: ['One', 'rest'],
  borderWidth: 1,
  datasets: [
    {
      label: '# %',
      data: [12.5, 87.5],
      backgroundColor: ['#3F51B5', '#C4C4C4'],
      borderWidth: 1,
    },
  ],
};

class Trackers extends Component {
  render() {
    return (
      <div className={styles.trackersWrapper}>
        <div className={styles.trackersWrapperPart1}>
          <div className={styles.trackers1Header}>
            <div className={styles.trackers1HeaderHeading}>Trackers</div>
            <div className={styles.trackers1HeaderSub}>Percentage of calls where each tracker was detected (based on 17 calls)</div>
          </div>
          <div className={styles.trackers1Body}>
            <div className={styles.trackers1BodyPart}>
              <div className={styles.bodyPartName}>Objections- Demo</div>
              <div className={styles.bodyPartPie}>
                <Doughnut
                  data={data}
                  options={{
                    maintainAspectRatio: false,
                    cutout: '75%',
                    plugins: {
                      legend: {
                        display: true,
                        position: 'center',
                      },
                    },
                  }}
                  width='120px'
                  height='120px'
                />
              </div>
              <div className={styles.percent}>12.5%</div>
            </div>
            {/* Repeat the same pattern for the remaining body parts */}
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
              <div className={styles.trackers2BodyDetail}>Name :</div>
              <div className={styles.trackers2BodyDetail}>Mobile :</div>
              <div className={styles.trackers2BodyDetail}>Email :</div>
              <div className={styles.trackers2BodyDetail}>Work :</div>
              <div className={styles.trackers2BodyDetail}>Status :</div>
            </div>
            <div className={styles.trackers2BodyLine}></div>
            <div className={styles.trackers2BodyCalls}>
              <div className={styles.trackers2BodyCallsHead}>
                <div className={styles.trackers2BodyCallsHeader} style={{ color: '#3F51B5' }}>Last 10 calls</div>
              </div>
              <div className={styles.trackers2BodyCallsHead}>
                <div className={styles.trackers2BodyCallsHeader}>ABC Company</div>
                <div className={styles.trackers2BodyCallsSub}>July 18, 2022</div>
              </div>
              <div className={styles.trackers2BodyCallsHead}>
                <div className={styles.trackers2BodyCallsHeader}>Conversation</div>
                <div className={styles.trackers2BodyCallsSub}>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil sed eum ipsa similique ducimus voluptas
                  labore odit, voluptatum architecto quam vel asperiores ipsum, et voluptatem quidem porro saepe odio.
                  Voluptates.
                </div>
              </div>
              <div className={styles.trackers2BodyMore} style={{ color: 'rgba(63, 81, 181, 0.72)' }}>View 2 more ..</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Trackers;
