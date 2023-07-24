import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import IndividualCoaching from '../components/IndividualCoaching';
import IndividualTrackers from '../components/IndividualTrackers';
import TeamsActivity from '../components/TeamActivity';
import styles from '../styles/teams.module.css';
import { useEffect } from 'react';
import { LoadingOverlay } from '@mantine/core';
import { useRouter } from 'next/router';
import IndividualInteraction from '../components/IndividualInteraction';

const Team = () => {
    const router = useRouter();
  const [navActive, setNavActive] = useState({
    teamActivity: true,
    teamInteraction: false,
    teamTopics: false,
    teamTrackers: false,
    teamSmart: false,
    teamScore: false,
    teamCoaching: false,
  });
  const [flag,setFlag] = useState(false);
  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState([]);
  const [calls, setCalls] = useState([]);
  const [invalid, setInvalid] = useState(false);
  const [trackers, setTrackers] = useState([]);
  const [user, setUser] = useState({});
  const [inuser, setInuser] = useState({});

  useEffect(() => {
    if(!router.isReady) return;
    console.log(localStorage.getItem('individual'))
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getIndividualDetails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: localStorage.getItem('individual'),
      })
    }).then((res) => res.json())  
    .then((data) => {
      console.log(data);
      if(data.status === true){
        setInuser(data.user);
        setInvalid(false);
        setLoading(false);
        // setTeam(data.team);
        setCalls(data.calls);
        setTrackers(data.calls.map((call) => call.file[0]?.trackerData !== undefined ? call.file[0].trackerData : null));
        setFlag(false);
      }
      if(data.status === false){
        setLoading(false);
        setInvalid(true);
      }
      setLoading(false)
    })
  },[loading, router.isReady])

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getUserDetails`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: localStorage.getItem('email')
      })
    }).then(res => res.json())
    .then(data => {
      console.log(data)
      if(data.status===true){
        setUser(data.user)
      }
    }
    ).catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <div className={styles.teamApp}>
      <LoadingOverlay visible={loading}/>
      <Navbar type="teams" />
      {!invalid ? (
        <div className={styles.teamWrapper}>
          <div className={styles.teamWrapperHead}>
            <div className={styles.teamWrapperHead1}>
              <div className={styles.teamWrapperHeading}>{inuser.name}'s Dashboard</div>
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
                {/* <div
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
                </div> */}
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
                {/* <div
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
                </div>*/}
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
          </div>
          <div className={styles.teamWrapperBody}>
            {navActive.teamActivity && (
              <div className={styles.bodyActivity}>
                <div className={styles.navName}>Activity</div>
                {calls.length === 0 ? (<></>):
                <TeamsActivity
                  calls={calls}
                />}
              </div>
            )}
            {navActive.teamInteraction && (
              <div className={styles.bodyInteraction}>
                <div className={styles.navName}>Interaction</div>
                <IndividualInteraction
                    calls={calls}
                    user={inuser}
                />
              </div>
            )}
            {/* {navActive.teamTopics && (
              <div className={styles.bodyTopics}>
                <div className={styles.navName}>Topics</div>
                <Topic />
              </div>
            )} */}
            {navActive.teamTrackers && (
              <div className={styles.bodyTrackers}>
                {trackers.length === 0 ? (
                  <div className={styles.noTrackers}>No Trackers Available</div>
                ) : (
                <IndividualTrackers 
                  trackers={trackers}
                  user={inuser}
                  calls={calls}
                />
                )}
              </div>
            )}
            {/* {navActive.teamSmart && (
              <div className={styles.bodyTrackers}>
                <div className={styles.navName}>Smart Trackers</div>
              </div>
            )}
            {navActive.teamScore && (
              <div className={styles.bodyScore}>
                <div className={styles.navName}>ScoreCard</div>
              </div>
            )} */}
            {navActive.teamCoaching && (
              <div className={styles.bodyCoaching}>
                <div className={styles.navName}>Coaching</div>
                <IndividualCoaching 
                  inuser={inuser}
                />
              </div>
            )}
          </div>
        </div>
      ):
      <div style={{"display":"flex","justifyContent":"center","alignItems":"center","fontSize":"30px","height":"100vh"}}>
        <div className={styles.invalidText}>No Details Available</div>
      </div>
      }
    </div>
  );
};

export default Team;
