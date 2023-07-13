import React, { useState } from 'react';
import styles from '../styles/Interaction.module.css';

const Interaction = ({ calls }) => {
  const [interactionname, setInteractionName] = useState({
    talkRatio: true,
    longMono: false,
    longStory: false,
    interactivity: false,
    patience: false,
  });

  //extract analysis from calls and analysis array not empty
  var analysis = calls.map((call) => {if (call.analysis.length > 0) return call.analysis});
  //remove undefined values from analysis
  analysis = analysis.filter((call) => call !== undefined);

  //extract values and take average
  var talkRatio = analysis.map((call) => call.map((analysis) => analysis.talkRatio.value));
  //for each same index in different arrays of talkRatio, take average
  talkRatio = talkRatio.reduce((acc, val) => acc.map((v, i) => (v + val[i]) / 2));
  console.log(talkRatio);
  const teamTalkRatio = talkRatio.reduce((acc, val) => acc + val)/talkRatio.length;

  //do same for patience, logestMonologue, longestCustomerStory
  var patience = analysis.map((call) => call.map((analysis) => analysis.patience.value));
  patience = patience.reduce((acc, val) => acc.map((v, i) => (v + val[i]) / 2));
  const teamPatience = patience.reduce((acc, val) => acc + val)/patience.length;
  //console.log(patience);

  var longestMonologue = analysis.map((call) => call.map((analysis) => analysis.longestMonologue.value));
  longestMonologue = longestMonologue.reduce((acc, val) => acc.map((v, i) => (v + val[i]) / 2));
  const teamMonologue = longestMonologue.reduce((acc, val) => acc + val)/longestMonologue.length;
  // console.log(longestMonologue);

  var longestCustomerStory = analysis.map((call) => call.map((analysis) => analysis.longestCustomerStory.value));
  longestCustomerStory = longestCustomerStory.reduce((acc, val) => acc.map((v, i) => (v + val[i]) / 2));
  const teamStory = longestCustomerStory.reduce((acc, val) => acc + val)/longestCustomerStory.length;
  // console.log(longestCustomerStory);

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
          <div style={{ fontWeight: '400', width: '100%' }}>{teamTalkRatio.toPrecision(2)}%</div>
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
          <div style={{ fontWeight: '400' }}>{teamMonologue.toPrecision(2)} secs</div>
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
          <div style={{ fontWeight: '400' }}>{teamStory.toPrecision(2)} secs</div>
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
          <div style={{ fontWeight: '400' }}>8:43</div>
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
          <div style={{ fontWeight: '400' }}>{teamPatience.toPrecision(2)}sec</div>
        </div>
      </div>
      <div className={styles.interactionWrapperData}>
        {interactionname.talkRatio && (
          <div className={styles.interactionWrapperCallDuration}>
            <div className={styles.talkRatioInfo}>
              <div className={styles.talkRatioInfoHead}>Talk Ratio</div>
              <div className={styles.talkRatioInfoSub}>Percentages of call in which team member spoke</div>
            </div>
            <div className={styles.barGraph}>
                {analysis[0].map((analysis,index) => (
                  <div className={styles.graph}>
                    <div className={styles.graphName}>{analysis.speaker}</div>
                    <div>{talkRatio[index]} %</div>
                    <div className={styles.graphData} style={{ width: `${(talkRatio[index]/talkRatio.reduce((a,b) => a+b,0))*100}%` }}></div>
                  </div>
                ))}
            </div>
          </div>
        )}
        {interactionname.longMono && (
          <div className={styles.interactionWrapperCallDuration}>
            <div className={styles.talkRatioInfo}>
              <div className={styles.talkRatioInfoHead}>Longest Monologue</div>
              <div className={styles.talkRatioInfoSub}>Percentages of call in which team member spoke</div>
            </div>
            <div className={styles.barGraph}>
              {analysis[0].map((analysis,index) => (
                    <div className={styles.graph}>
                      <div className={styles.graphName}>{analysis.speaker}</div>
                      <div>{longestMonologue[index]} secs</div>
                      <div className={styles.graphData} style={{ width: `${(longestMonologue[index]/longestMonologue.reduce((a,b) => a+b,0))*100}%` }}></div>
                    </div>
                  ))}
            </div>
          </div>
        )}
        {interactionname.longStory && (
          <div className={styles.interactionWrapperCallDuration}>
            <div className={styles.talkRatioInfo}>
              <div className={styles.talkRatioInfoHead}>Longest Customer Story</div>
              <div className={styles.talkRatioInfoSub}>Percentages of call in which team member spoke</div>
            </div>
            <div className={styles.barGraph}>
             {analysis[0].map((analysis,index) => (
                    <div className={styles.graph}>
                      <div className={styles.graphName}>{analysis.speaker}</div>
                      <div>{longestCustomerStory[index]} secs</div>
                      <div className={styles.graphData} style={{ width: `${(longestCustomerStory[index]/longestCustomerStory.reduce((a,b) => a+b,0))*100}%` }}></div>
                    </div>
                  ))}
            </div>
          </div>
        )}
        {interactionname.interactivity && (
          <div className={styles.interactionWrapperCallDuration}>
            <div className={styles.talkRatioInfo}>
              <div className={styles.talkRatioInfoHead}>Interactivity</div>
              <div className={styles.talkRatioInfoSub}>Percentages of call in which team member spoke</div>
            </div>
            <div className={styles.barGraph}>
              <div className={styles.graph}>
                <div className={styles.graphName}>Name</div>
                <div className={styles.graphData} style={{ width: '50%' }}></div>
              </div>
              {/* Rest of the graph elements */}
            </div>
          </div>
        )}
        {interactionname.patience && (
          <div className={styles.interactionWrapperCallDuration}>
            <div className={styles.talkRatioInfo}>
              <div className={styles.talkRatioInfoHead}>Patience</div>
              <div className={styles.talkRatioInfoSub}>Percentages of call in which team member spoke</div>
            </div>
            <div className={styles.barGraph}>
                {analysis[0].map((analysis,index) => (
                    <div className={styles.graph}>
                      <div className={styles.graphName}>{analysis.speaker}</div>
                      <div>{patience[index]} secs</div>
                      <div className={styles.graphData} style={{ width: `${(patience[index]/patience.reduce((a,b) => a+b,0))*100}%` }}></div>
                    </div>
                  ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Interaction;
