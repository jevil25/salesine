import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Interaction from '../components/Interaction';
import Coaching from '../components/Coaching';
import Trackers from '../components/Trackers';
import TeamsActivity from '../components/TeamActivity';
import Topic from '../components/Topic';
import styles from '../styles/teams.module.css';

const Team = () => {
  const [navActive, setNavActive] = useState({
    teamActivity: true,
    teamInteraction: false,
    teamTopics: false,
    teamTrackers: false,
    teamSmart: false,
    teamScore: false,
    teamCoaching: false,
  });

  return (
    <div className={styles.teamApp}>
      <Navbar type="teams" />
      <div className={styles.teamWrapper}>
        <div className={styles.teamWrapperHead}>
          <div className={styles.teamWrapperHead1}>
            <div className={styles.teamWrapperHeading}>Team Dashboard</div>
            <div className={styles.teamWrapperNav}>
              <div
                className={styles.headNav}
                style={{ color: navActive.teamActivity ? '#3F51B5' : '#333333' }}
                onClick={() =>
                  setNavActive({
                    teamActivity: true,
                    teamInteraction: false,
                    teamTopics: false,
                    teamTrackers: false,
                    teamSmart: false,
                    teamScore: false,
                    teamCoaching: false,
                  })
                }
              >
                Activity
              </div>
              <div
                className={styles.headNav}
                style={{ color: navActive.teamInteraction ? '#3F51B5' : '#333333' }}
                onClick={() =>
                  setNavActive({
                    teamActivity: false,
                    teamInteraction: true,
                    teamTopics: false,
                    teamTrackers: false,
                    teamSmart: false,
                    teamScore: false,
                    teamCoaching: false,
                  })
                }
              >
                Interaction
              </div>
              <div
                className={styles.headNav}
                style={{ color: navActive.teamTopics ? '#3F51B5' : '#333333' }}
                onClick={() =>
                  setNavActive({
                    teamActivity: false,
                    teamInteraction: false,
                    teamTopics: true,
                    teamTrackers: false,
                    teamSmart: false,
                    teamScore: false,
                    teamCoaching: false,
                  })
                }
              >
                Topics
              </div>
              <div
                className={styles.headNav}
                style={{ color: navActive.teamTrackers ? '#3F51B5' : '#333333' }}
                onClick={() =>
                  setNavActive({
                    teamActivity: false,
                    teamInteraction: false,
                    teamTopics: false,
                    teamTrackers: true,
                    teamSmart: false,
                    teamScore: false,
                    teamCoaching: false,
                  })
                }
              >
                Trackers
              </div>
              <div
                className={styles.headNav}
                style={{ color: navActive.teamSmart ? '#3F51B5' : '#333333' }}
                onClick={() =>
                  setNavActive({
                    teamActivity: false,
                    teamInteraction: false,
                    teamTopics: false,
                    teamTrackers: false,
                    teamSmart: true,
                    teamScore: false,
                    teamCoaching: false,
                  })
                }
              >
                Smart Trackers
              </div>
              <div
                className={styles.headNav}
                style={{ color: navActive.teamScore ? '#3F51B5' : '#333333' }}
                onClick={() =>
                  setNavActive({
                    teamActivity: false,
                    teamInteraction: false,
                    teamTopics: false,
                    teamTrackers: false,
                    teamSmart: false,
                    teamScore: true,
                    teamCoaching: false,
                  })
                }
              >
                Scorecard
              </div>
              <div
                className={styles.headNav}
                style={{ color: navActive.teamCoaching ? '#3F51B5' : '#333333' }}
                onClick={() =>
                  setNavActive({
                    teamActivity: false,
                    teamInteraction: false,
                    teamTopics: false,
                    teamTrackers: false,
                    teamSmart: false,
                    teamScore: false,
                    teamCoaching: true,
                  })
                }
              >
                Coaching Received
              </div>
            </div>
          </div>
          <div className={styles.teamWrapperHead2}>
            <div className={styles.teamHeadButton}>
              <div className={styles.teamHeadButtonName}>STATS</div>
            </div>
            <div className={styles.teamHeadButton}>
              <div className={styles.teamHeadButtonName}>COACHING</div>
            </div>
          </div>
        </div>
        <div className={styles.teamWrapperBody}>
          {navActive.teamActivity && (
            <div className={styles.bodyActivity}>
              <div className={styles.navName}>Activity</div>
              <TeamsActivity />
            </div>
          )}
          {navActive.teamInteraction && (
            <div className={styles.bodyInteraction}>
              <div className={styles.navName}>Interaction</div>
              <Interaction />
            </div>
          )}
          {navActive.teamTopics && (
            <div className={styles.bodyTopics}>
              <div className={styles.navName}>Topics</div>
              <Topic />
            </div>
          )}
          {navActive.teamTrackers && (
            <div className={styles.bodyTrackers}>
              <Trackers />
            </div>
          )}
          {navActive.teamSmart && (
            <div className={styles.bodyTrackers}>
              <div className={styles.navName}>Smart Trackers</div>
            </div>
          )}
          {navActive.teamScore && (
            <div className={styles.bodyScore}>
              <div className={styles.navName}>ScoreCard</div>
            </div>
          )}
          {navActive.teamCoaching && (
            <div className={styles.bodyCoaching}>
              <div className={styles.navName}>Team Coaching</div>
              <Coaching />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Team;
