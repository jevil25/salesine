import React, { useState } from 'react';
import styles from '../styles/Interaction.module.css';
import styles1 from '../styles/Trackers.module.css';
import ellipse from '../../public/assets/Ellipse.png';
import Image from 'next/image';

function IndividualInteraction({ calls,user }){
    console.log(calls);
    let talkRange, monologueRange, storyRange, interactivityRange, patienceRange;

    //get analysis of meetHosyId 
    const analysis = calls.map((call) => {
        const meetHostId = call.meetHostId;
        const analysis = call.analysis.map((analysis) => analysis.speaker==meetHostId?analysis:null);
        const filteredAnalysis = analysis.filter((analysis) => analysis != null);
        return filteredAnalysis;
    });
    //remove 0 length analysis
    const filteredAnalysis = analysis.filter((analysis) => analysis.length != 0);
    console.log(filteredAnalysis);
    //get talk ratio
    const talkRatio = filteredAnalysis.map((analysis) => {
        const talkRatio = analysis.map((analysis) => analysis.talkRatio);
        talkRange = talkRatio[0].label;
        return talkRatio[0].value;
    });
    //get monologue
    const monologue = filteredAnalysis.map((analysis) => {
        const monologue = analysis.map((analysis) => analysis.longestMonologue);
        monologueRange = monologue[0].label;
        return monologue[0].value;
    });
    //get story
    const story = filteredAnalysis.map((analysis) => {
        const story = analysis.map((analysis) => analysis.longestCustomerStory);
        storyRange = story[0].label;
        return story[0].value;
    });
    //get interactivity
    const interactivity = filteredAnalysis.map((analysis) => {
        const interactivity = analysis.map((analysis) => analysis.Interactivity);
        interactivityRange = interactivity[0].recommend;
        return interactivity[0].value;
    });
    //get patience
    const patience = filteredAnalysis.map((analysis) => {
        const patience = analysis.map((analysis) => analysis.patience);
        patienceRange = patience[0].label;
        return patience[0].value;
    });
    //get average of talk 
    const averageTalkRatio = talkRatio.reduce((a, b) => a + b, 0) / talkRatio.length;
    //get average of monologue
    const averageMonologue = monologue.reduce((a, b) => a + b, 0) / monologue.length;
    //get average of story
    const averageStory = story.reduce((a, b) => a + b, 0) / story.length;
    //get average of interactivity
    const averageInteractivity = interactivity;
    //get average of patience
    const averagePatience = patience.reduce((a, b) => a + b, 0) / patience.length;

  const [interactionname, setInteractionName] = useState({
    talkRatio: true,
    longMono: false,
    longStory: false,
    interactivity: false,
    patience: false,
  });

  if(calls.length === 0) return (<div className={styles.interactionWrapper}>
    <div className={styles.interactionWrapperHead}>
      No calls to show
    </div>
  </div>)

  return (
    <div className={styles.interactionWrapper} style={{display:"flex",flexDirection:"row"}}>
      <div className={styles.interactionWrapperHeadIndividual}>
        <div
          className={styles.interactionWrapperHeadNameindi}
          onClick={() =>
            setInteractionName({
              talkRatio: true,
              longMono: false,
              longStory: false,
              interactivity: false,
              patience: false,
            })
          }
        >
          <div style={{ width: '100%' }}>Talk Ratio</div>
          <div style={{ fontWeight: '400', width: '100%' }}>{averageTalkRatio}%</div>
          <div>{talkRange}</div>
        </div>
        <div
          className={styles.interactionWrapperHeadNameindi}
          onClick={() =>
            setInteractionName({
              talkRatio: false,
              longMono: true,
              longStory: false,
              interactivity: false,
              patience: false,
            })
          }
        >
          <div>LONGEST MONOLOGUE</div>
          <div style={{ fontWeight: '400' }}>{averageMonologue} secs</div>
          <div>{monologueRange}</div>
        </div>
        <div
          className={styles.interactionWrapperHeadNameindi}
          onClick={() =>
            setInteractionName({
              talkRatio: false,
              longMono: false,
              longStory: true,
              interactivity: false,
              patience: false,
            })
          }
        >
          <div>LONGEST CUSTOMER STORY</div>
          <div style={{ fontWeight: '400' }}>{averageStory} secs</div>
          <div>{storyRange}</div>
        </div>
        <div
          className={styles.interactionWrapperHeadNameindi}
          onClick={() =>
            setInteractionName({
              talkRatio: false,
              longMono: false,
              longStory: false,
              interactivity: true,
              patience: false,
            })
          }
        >
          <div>INTERACTIVITY</div>
          <div style={{ fontWeight: '400' }}>{averageInteractivity[averageInteractivity.length-1]}</div>
          <div>{interactivityRange}</div>
        </div>
        <div
          className={styles.interactionWrapperHeadNameindi}
          onClick={() =>
            setInteractionName({
              talkRatio: false,
              longMono: false,
              longStory: false,
              interactivity: false,
              patience: true,
            })
          }
        >
          <div>PATIENCE</div>
          <div style={{ fontWeight: '400' }}>{averagePatience}sec</div>
          <div>{patienceRange}</div>
        </div>
      </div>
      <div className={styles1.trackersWrapperPart2}>
          <div className={styles1.trackers2Header}>
            <div className={styles1.trackers2HeaderHeading}>Details</div>
          </div>
          <div className={styles1.trackers2Body}>
            <div className={styles1.trackers2BodyImg}>
              <Image src={ellipse} alt="" />
            </div>
            <div className={styles1.trackers2BodyDetails}>
              <div className={styles1.trackers2BodyDetail}>Name :{user.name}</div>
              <div className={styles1.trackers2BodyDetail}>Email :{user.email}</div>
              <div className={styles1.trackers2BodyDetail}>Work :{user.role}</div>
              <div className={styles1.trackers2BodyDetail}>Status :Active</div>
            </div>
            <div className={styles1.trackers2BodyLine}></div>
            <div className={styles1.trackers2BodyCalls}>
              <div className={styles1.trackers2BodyCallsHead}>
                <div className={styles1.trackers2BodyCallsHeader} style={{ color: '#3F51B5' }}>Last {calls.length} calls</div>
              </div>
              {calls.length > 0 ? calls.map((meeting) => {
                console.log(meeting);
              return <div className={styles1.trackers2BodyCallsHead}>
                <div className={styles1.trackers2BodyCallsHeader}>{meeting.Company.name}</div>
                <div className={styles1.trackers2BodyCallsSub}>{meeting.topic}</div>
              </div>
              }) : <div className={styles1.trackers2BodyCallsHead}>
                <div className={styles1.trackers2BodyCallsHeader}>No calls to show</div>
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
};

export default IndividualInteraction;
