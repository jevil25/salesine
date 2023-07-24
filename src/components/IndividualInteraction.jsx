import React, { useState } from 'react';
import styles from '../styles/Interaction.module.css';

function IndividualInteraction({ calls,name }){
    console.log(calls);
    const [teamTalkRatio, setTeamTalkRatio] = useState([]);
    const [teamMonologue, setTeamMonologue] = useState([]);
    const [teamStory, setTeamStory] = useState([]);
    const [teamPatience, setTeamPatience] = useState([]);
    const [teamInteractivity, setTeamInteractivity] = useState([]);

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
        return talkRatio[0].value;
    });
    //get monologue
    const monologue = filteredAnalysis.map((analysis) => {
        const monologue = analysis.map((analysis) => analysis.longestMonologue);
        return monologue[0].value;
    });
    //get story
    const story = filteredAnalysis.map((analysis) => {
        const story = analysis.map((analysis) => analysis.longestCustomerStory);
        return story[0].value;
    });
    //get interactivity
    const interactivity = filteredAnalysis.map((analysis) => {
        const interactivity = analysis.map((analysis) => analysis.Interactivity);
        return interactivity[0].value;
    });
    //get patience
    const patience = filteredAnalysis.map((analysis) => {
        const patience = analysis.map((analysis) => analysis.patience);
        return patience[0].value;
    });
    //get average of talk 
    const averageTalkRatio = talkRatio.reduce((a, b) => a + b, 0) / talkRatio.length;
    //get average of monologue
    const averageMonologue = monologue.reduce((a, b) => a + b, 0) / monologue.length;
    //get average of story
    const averageStory = story.reduce((a, b) => a + b, 0) / story.length;
    //get average of interactivity
    const averageInteractivity = interactivity.reduce((a, b) => a + b, 0) / interactivity.length;
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
    <div className={styles.interactionWrapper}>
      <div className={styles.interactionWrapperHead}>
        <div
          className={interactionname.talkRatio ? styles.changei : styles.interactionWrapperHeadName}
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
        </div>
        <div
          className={interactionname.longMono ? styles.changei : styles.interactionWrapperHeadName}
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
        </div>
        <div
          className={interactionname.longStory ? styles.changei : styles.interactionWrapperHeadName}
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
        </div>
        <div
          className={interactionname.interactivity ? styles.changei : styles.interactionWrapperHeadName}
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
          <div style={{ fontWeight: '400' }}>{averageInteractivity}</div>
        </div>
        <div
          className={interactionname.patience ? styles.changei : styles.interactionWrapperHeadName}
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
        </div>
      </div>
    </div>
  );
};

export default IndividualInteraction;
