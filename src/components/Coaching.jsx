import React from 'react';
import msg from '../../public/assets/msg.png';
import styles from '../styles/Coaching.module.css';

export const feedback = [
  { starting: 'July', ending: 'August', num: 2 },
  { starting: 'July', ending: 'August', num: 1 },
  { starting: 'July', ending: 'August', num: 1 },
  { starting: 'July', ending: 'August', num: 1 },
  { starting: 'July', ending: 'August', num: 0 },
  { starting: 'July', ending: 'August', num: 3 },
];

const Coaching = () => {
  return (
    <div className={styles.coachingWrapper}>
      <div className={styles.coachingWrapperHeader}>Team Members</div>
      <div className={styles.coachingWrapperBody}>
        {feedback.map((feed, i) => (
          <div className={styles.coachingWrapperDiv} key={i}>
            <div className={styles.DivTitle}>ABC</div>
            <div className={styles.DivLine}></div>
            <div className={styles.DivFeedback}>
              <div className={styles.DivFeedbackHead}>
                <div className={styles.DivFeedbackHeadName}>Feedback on calls (Past month)</div>
                <div className={styles.DivFeedbackHeadNum}>{feed.num}</div>
              </div>
              <div className={styles.DivFeedbackInfo}>
                <div className={styles.DivFeedbackInfoStarting}>{feed.starting}</div>
                <div className={styles.DivFeedbackInfoLines}>
                  <div className={styles.msgimg}>
                    {[...Array(feed.num)].map((n, index) => (
                      <img src={msg} key={index} alt="" />
                    ))}
                  </div>
                  <div className={styles.DivLine}></div>
                </div>
                <div className={styles.DivFeedbackInfoEnding}>{feed.ending}</div>
              </div>
            </div>
            <div className={styles.DivLine}></div>
            <div className={styles.DivFooter}>
              <div className={styles.coachingFooter}>Open Quest</div>
              <div className={styles.coachingLine}></div>
              <div className={styles.coachingFooter}>View Calls</div>
              <div className={styles.coachingLine}></div>
              <div className={styles.coachingFooter}>Last Feedback</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Coaching;
