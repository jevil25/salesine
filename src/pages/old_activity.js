import React from 'react';
import styles from '../styles/Activity.module.css';
import Navbar from '../components/Navbar';
import Company from '../components/Company'
import moment from 'moment';

const Activity = () => {
  const date = moment().format('D MMM, YYYY');
  const month = moment().format('dddd, MMM D, YYYY');

  return (
    <div className={styles.activityApp}>
      <Navbar type="activity" />
      <div className={styles.activityAppWrapper}>
        <div className={styles.activityAppWrapperHeader}>
          <div className={styles.activityAppWrapperHeading}>
            <div>{month}</div>
            <div className={styles.activityDay} style={{ color: '#3F51B5' }}>Today</div>
            <div className={styles.activitySearch}>
              <input type="text" placeholder="Search..." />
              <img src="https://img.icons8.com/ios-glyphs/20/3F51B5/search--v1.png" alt="" />
            </div>
          </div>
          <div className={styles.activityAppWrapperDate}>{date}</div>
        </div>
        <div className={styles.activityAppWrapperBody}>
          <div className={styles.activityAppWrapperBodyPart}>
            <div className={styles.activityAppWrapperBodyPart1}>Pam</div>
            <div className={styles.activityAppWrapperBodyPart1}>Monica</div>
            <div className={styles.activityAppWrapperBodyPart1}>Alex</div>
            <div className={styles.activityAppWrapperBodyPart1}>Tara</div>
            <div className={styles.activityAppWrapperBodyPart1}>Emily</div>
            <div className={styles.activityAppWrapperBodyPart1}>Raj</div>
          </div>
          <div className={styles.activityAppWrapperBodyPart12}>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', color: '#3F51B5' }}>
              <div>9 AM</div>
              <div>10 AM</div>
              <div>11 AM</div>
              <div>12 AM</div>
            </div>
            <div className={styles.bodyPart12}>
              <div className={styles.activityAppWrapperBodyPart2}>
                <div className={styles.InnerPart}>Acne Co. | $57,806 | Open Renewal | Close Deal: Dec</div>
                <div className={styles.InnerPart}>Internal Call</div>
              </div>
              <div className={styles.activityAppWrapperBodyPart2}></div>
              <div className={styles.activityAppWrapperBodyPart2}></div>
              <div className={styles.activityAppWrapperBodyPart2}></div>
            </div>
            <div className={styles.bodyPart12}>
              <div className={styles.activityAppWrapperBodyPart2}></div>
              <div className={styles.activityAppWrapperBodyPart2}></div>
              <div className={styles.activityAppWrapperBodyPart2}>
                <div className={styles.InnerPart}>Internal Call</div>
              </div>
              <div className={styles.activityAppWrapperBodyPart2}></div>
            </div>
            <div className={styles.bodyPart12}>
              <div className={styles.activityAppWrapperBodyPart2}></div>
              <div className={styles.activityAppWrapperBodyPart2}>
                <div className={styles.InnerPart}>Internal Call</div>
                <div className={styles.InnerPart}>Internal Call</div>
              </div>
              <div className={styles.activityAppWrapperBodyPart2}></div>
              <div className={styles.activityAppWrapperBodyPart2}></div>
            </div>
            <div className={styles.bodyPart12}>
              <div className={styles.activityAppWrapperBodyPart2}></div>
              <div className={styles.activityAppWrapperBodyPart2}>
                <div className={styles.InnerPart}>Acne Co. | $57,806 | Open Renewal | Close Deal: Dec</div>
                <div className={styles.InnerPart}>Internal Call</div>
              </div>
              <div className={styles.activityAppWrapperBodyPart2}></div>
              <div className={styles.activityAppWrapperBodyPart2}></div>
            </div>
            <div className={styles.bodyPart12}>
              <div className={styles.activityAppWrapperBodyPart2}></div>
              <div className={styles.activityAppWrapperBodyPart2}></div>
              <div className={styles.activityAppWrapperBodyPart2}></div>
              <div className={styles.activityAppWrapperBodyPart2}></div>
            </div>
            <div className={styles.bodyPart12}>
              <div className={styles.activityAppWrapperBodyPart2}></div>
              <div className={styles.activityAppWrapperBodyPart2}></div>
              <div className={styles.activityAppWrapperBodyPart2}></div>
              <div className={styles.activityAppWrapperBodyPart2}>
                <div className={styles.InnerPart}>Acne Co. | $57,806 | Open Renewal | Close Deal: Dec</div>
                <div className={styles.InnerPart}>Internal Call</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;
