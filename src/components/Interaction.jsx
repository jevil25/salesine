import React, { useState } from 'react';
import styles from '../styles/Interaction.module.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Interaction = ({ calls }) => {
  const router = useRouter();
  console.log(calls);
  const [speakerNamesArray, setSpeakerNamesArray] = useState([]);
  console.log(calls);
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

  // Function to calculate the average for the same speaker
function calculateAverageForSameSpeaker(arrayOfArrays) {
  //arrayOfArrays is an array of arrays like [[speaker1, value1], [speaker2, value2], [speaker1, value3], [speaker3, value4]
  const speakerMap = new Map(); // To store speaker ID as the key and an array of values as the value

  //get the unique speakers
  let uniqueSpeakers = [...new Map(arrayOfArrays.map((array) => array.map((array) => array[0])))];
  //get the speakers from pos 0
  uniqueSpeakers = uniqueSpeakers.map((array) => array[0]);
  
  const averages = [];
  //find the values for each speaker if multiple values are present for same speaker then take average create a array [speaker, average]
  uniqueSpeakers.forEach((speaker) => {
    //find the values for same speaker
    const values = arrayOfArrays.map((array) => array[0][0]===speaker ? array[0][1] : 0);
    // console.log(values);
    const filteredValues = values.filter((value) => value !== 0);
    // console.log(filteredValues);
    const average = filteredValues.reduce((a,b) => a+b,0)/filteredValues.length;
    //make a array of speaker and average
    const speakerAverage = [speaker,average];
    //add to map
    averages.push(speakerAverage);
  });
  // console.log(averages);
  return averages;
}

function calculateAverageForSameSpeakerInteractivity(arrayOfArrays) {
  //arrayOfArrays is an array of arrays like [[speaker1, value1], [speaker2, value2], [speaker1, value3], [speaker3, value4]
  const speakerMap = new Map(); // To store speaker ID as the key and an array of values as the value

  //get the unique speakers
  let uniqueSpeakers = [...new Map(arrayOfArrays.map((array) => array.map((array) => array[0])))];
  //get the speakers from pos 0
  uniqueSpeakers = uniqueSpeakers.map((array) => array[0]);
  
  const averages = [];
  //find the values for each speaker if multiple values are present for same speaker then take average create a array [speaker, average]
  uniqueSpeakers.forEach((speaker) => {
    //find the values for same speaker
    const values = arrayOfArrays.map((array) => array[0][0]===speaker ? array[0][1] : 0);
    // console.log(values);
    const filteredValues = values.filter((value) => value !== 0);
    // console.log(filteredValues);
    //push first value
    const average = filteredValues[filteredValues.length-1];
    //convert average to time
    const speakerAverage = [speaker,average];
    //add to map
    averages.push(speakerAverage);
  });
  // console.log(averages);
  return averages;
}

  //extract analysis from calls and analysis array not empty
  var analysis = calls.map((call) => {if (call.analysis.length > 0) return call.analysis});
  //remove undefined values from analysis
  analysis = analysis.filter((call) => call !== undefined);
  //for each meet of analysis, only keep speakers with speaker length>5
  analysis = analysis.map((call) => call.filter((analysis) => analysis.speaker.length > 5));
  // console.log(analysis);
  //extract values and take average where speaker are same 
  var talkRatio = analysis.map((call) => call.map((analysis) => [analysis.speaker,analysis.talkRatio.value]));
  // console.log(talkRatio);
  const speakerAverages = calculateAverageForSameSpeaker(talkRatio);
  // console.log(speakerAverages);
  //get the team talk ratio from [speaker, average] array
  const teamTalkRatio = speakerAverages.reduce((sum, [, value]) => sum + value/speakerAverages.length, 0);
  // console.log(teamTalkRatio);

  //do same for patience, logestMonologue, longestCustomerStory
  var patience = analysis.map((call) => call.map((analysis) => [analysis.speaker,analysis.patience.value]));
  // console.log(patience)
  const patienceAverages = calculateAverageForSameSpeaker(patience);
  // console.log(patienceAverages);
  const teamPatience = patienceAverages.reduce((sum, [, value]) => sum + value/patienceAverages.length, 0);
  // console.log(teamPatience);

  var longestMonologue = analysis.map((call) => call.map((analysis) => [analysis.speaker,analysis.longestMonologue.value]));
  // console.log(longestMonologue)
  const longestMonologueAverages = calculateAverageForSameSpeaker(longestMonologue);
  // console.log(longestMonologueAverages);
  const teamMonologue = longestMonologueAverages.reduce((sum, [, value]) => sum + value/longestMonologueAverages.length, 0);
  // console.log(teamMonologue);

  var longestCustomerStory = analysis.map((call) => call.map((analysis) => [analysis.speaker,analysis.longestCustomerStory.value]));
  const longestCustomerStoryAverages = calculateAverageForSameSpeaker(longestCustomerStory);
  // console.log(longestCustomerStoryAverages);
  const teamStory = longestCustomerStoryAverages.reduce((sum, [, value]) => sum + value/longestCustomerStoryAverages.length, 0);
  // console.log(teamStory);
  var interactivity = analysis.map((call) => call.map((analysis) => [analysis.speaker,analysis.Interactivity.value]));
  const interactivityAverages = calculateAverageForSameSpeakerInteractivity(interactivity);
  // console.log(interactivityAverages);

  const [email, setEmail] = useState({});

  async function getUser(id) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getUserDetailsById`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: id
        })
      });
      const data = await res.json();
  
      if (data.status === true) {
        setEmail((prevState) => ({
          ...prevState,
          [data.user.name]: data.user.email
          }))
        return data.user.name;
      } else {
        return null; // Return null if the status is false or any other error condition
      }
    } catch (err) {
      console.log(err);
      return null; // Return null in case of any error
    }
  }
  useEffect(() => {
    async function getSpeakerNames() {
    // Assuming speakerAverages is an array of speaker IDs
    await Promise.all(speakerAverages.map(async (speaker) => {
      const name = await getUser(speaker[0]);
      if (name !== null) {
        setSpeakerNamesArray(speakerNamesArray => [...speakerNamesArray, name]);
      }
    })); 
  }
  getSpeakerNames();
  }, [longestMonologueAverages]);

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
          <div style={{ fontWeight: '400', width: '100%' }}>{teamTalkRatio.toFixed(2)}%</div>
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
          <div style={{ fontWeight: '400' }}>{teamMonologue.toFixed(2)} secs</div>
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
          <div style={{ fontWeight: '400' }}>{teamStory.toFixed(2)} secs</div>
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
          <div style={{ fontWeight: '400' }}>{teamPatience.toFixed(2)}sec</div>
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
                {speakerAverages.map((analysis,index) => (<>
                  <div className={styles.graph} onClick={e => {
                    localStorage.setItem("individual", email[speakerNamesArray[index]]);
                    router.push("/individual");
                  }}>
                    <div className={styles.graphName}>{speakerNamesArray[index]}</div>
                  </div>
                  <div className={styles.graph} onClick={e => {
                    localStorage.setItem("individual", email[speakerNamesArray[index]]);
                    router.push("/individual");
                  }}>
                    <div className={styles.graphData} style={{ width: `${(analysis[1]/speakerAverages.reduce((sum, [, value]) => sum + value, 0))*100}%` }}></div><div>{analysis[1]} %</div>
                  </div>
                </>))}
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
            {longestMonologueAverages.map((analysis,index) => {
              return <>      
                  <div className={styles.graph} onClick={e => {
                    localStorage.setItem("individual", email[speakerNamesArray[index]]);
                    router.push("/individual");
                  }}>
                    <div className={styles.graphName}>{speakerNamesArray[index]}</div>
                  </div>
                  <div className={styles.graph} onClick={e => {
                    localStorage.setItem("individual", email[speakerNamesArray[index]]);
                    router.push("/individual");
                  }}>
                    <div className={styles.graphData} style={{ width: `${(analysis[1]/longestMonologueAverages.reduce((sum, [, value]) => sum + value, 0))*100}%` }}></div><div>{analysis[1]} %</div>
                  </div>
                </>})}
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
            {longestCustomerStoryAverages.map((analysis,index) => (<>
                  <div className={styles.graph} onClick={e => {
                    localStorage.setItem("individual", email[speakerNamesArray[index]]);
                    router.push("/individual");
                  }}>
                    <div className={styles.graphName}>{speakerNamesArray[index]}</div>
                  </div>
                  <div className={styles.graph} onClick={e => {
                    localStorage.setItem("individual", email[speakerNamesArray[index]]);
                    router.push("/individual");
                  }}>
                    <div className={styles.graphData} style={{ width: `${(analysis[1]/longestCustomerStoryAverages.reduce((sum, [, value]) => sum + value, 0))*100}%` }}></div><div>{analysis[1]} %</div>
                  </div>
                </>))}
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
            {interactivityAverages.map((analysis,index) => (<>
                  <div className={styles.graph} onClick={e => {
                    localStorage.setItem("individual", email[speakerNamesArray[index]]);
                    router.push("/individual");
                  }}>
                    <div className={styles.graphName}>{speakerNamesArray[index]}</div>
                  </div>
                  <div className={styles.graph} onClick={e => {
                    localStorage.setItem("individual", email[speakerNamesArray[index]]);
                    router.push("/individual");
                  }}>
                    <div className={styles.graphData} style={{ width: `${parseInt(100*((parseInt(analysis[1].split(":")[0]))/interactivityAverages.reduce((sum, [, value]) => sum + parseInt(value.split(":")[0]), 0)))}%` }}></div><div>{analysis[1]}</div>
                  </div>
                </>))}
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
            {patienceAverages.map((analysis,index) => (<>
                  <div className={styles.graph} onClick={e => {
                    localStorage.setItem("individual", email[speakerNamesArray[index]]);
                    router.push("/individual");
                  }}>
                    <div className={styles.graphName}>{speakerNamesArray[index]}</div>
                  </div>
                  <div className={styles.graph} onClick={e => {
                    localStorage.setItem("individual", email[speakerNamesArray[index]]);
                    router.push("/individual");
                  }}>
                    <div className={styles.graphData} style={{ width: `${(analysis[1]/patienceAverages.reduce((sum, [, value]) => sum + value, 0))*100}%` }}></div><div>{analysis[1]} %</div>
                  </div>
                </>))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Interaction;
