import React, { useState } from 'react';
import styles from '../styles/Interaction.module.css';

const Interaction = () => {
  const [interactionname, setInteractionName] = useState({
    talkRatio: true,
    longMono: false,
    longStory: false,
    interactivity: false,
    patience: false,
  });

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
          <div style={{ fontWeight: '400', width: '100%' }}>45%</div>
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
          <div style={{ fontWeight: '400' }}>1:12min</div>
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
          <div style={{ fontWeight: '400' }}>1:36min</div>
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
          <div style={{ fontWeight: '400' }}>0.84sec</div>
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
              <div className={styles.graph}>
                <div className={styles.graphName}>Name</div>
                <div className={styles.graphData} style={{ width: '50%' }}></div>
              </div>
              {/* Rest of the graph elements */}
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
              <div className={styles.graph}>
                <div className={styles.graphName}>Name</div>
                <div className={styles.graphData} style={{ width: '50%' }}></div>
              </div>
              {/* Rest of the graph elements */}
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
              <div className={styles.graph}>
                <div className={styles.graphName}>Name</div>
                <div className={styles.graphData} style={{ width: '50%' }}></div>
              </div>
              {/* Rest of the graph elements */}
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
              <div className={styles.graph}>
                <div className={styles.graphName}>Name</div>
                <div className={styles.graphData} style={{ width: '50%' }}></div>
              </div>
              {/* Rest of the graphelements */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Interaction;
