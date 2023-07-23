import styles from '../styles/Stats.module.css'
import tips from '../../public/assets/tips.png'
import Image from "next/image";
import { useEffect,useState } from 'react';

const Stats = ({ stats,meetHostId }) => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    role: ''
  })

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getUserDetailsById`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: meetHostId
      })
    }).then(res => res.json())
    .then(data => {
      if(data.status===true){
        setUserDetails(data.user)
      }
    }
    ).catch(err => {
      console.log(err)
    })
  }, [meetHostId])

  //TODO: filter stats for current user when model ready
  const speaker_0 = stats.filter((stat) => stat.speaker === meetHostId);

  function talkRatioCheck(){
    const recommended = speaker_0[0].talkRatio.recommend;
    //its of the form 10~65% get value by splitting
    const recommendedRange = recommended.split("~");
    //get the lower limit
    const lowerLimit = recommendedRange[0].split("%")[0];
    //get the upper limit
    const upperLimit = recommendedRange[1].split("%")[0];
    //check if the value is within the recommended range
    if(parseFloat(speaker_0[0].talkRatio.value) > parseFloat(lowerLimit) && parseFloat(speaker_0[0].talkRatio.value) < parseFloat(upperLimit)){
      return `Within recommended range, keep it between ${lowerLimit}% and ${upperLimit}%`
    }
    else
    {
      return `Not within recommended range, keep it between ${lowerLimit}% and ${upperLimit}%`
    }
  }

  function longMonoCheck(){
    const recommended = speaker_0[0].longestMonologue.recommend;
    //check if below or above
    if(recommended.includes("Below")){
      //get the value
      const value = recommended.split("Below")[1].split("min")[0];
      //check if the value is less than the recommended value
      if(parseFloat(speaker_0[0].longestMonologue.value) < parseFloat(value)){
        return `Within recommended range, keep it below ${value} mins`
      }
      else{
        return `Not within recommended range, keep it below ${value} mins`
      }
    }
    else{
      //get the value
      const value = recommended.split("Above")[1].split("min")[0];
      //check if the value is greater than the recommended value
      if(parseFloat(speaker_0[0].longestMonologue.value) > parseFloat(value)){
        return `Within recommended range, keep it above ${value} mins`
      }
      else{
        return `Not within recommended range, keep it above ${value} mins`
      }
    }
  }

  function longCusStoryCheck(){
    const recommended = speaker_0[0].longestCustomerStory.recommend;
    //is of the form 1-2min
    const recommendedRange = recommended.split("~");
    //get the lower limit
    const lowerLimit = recommendedRange[0].split("min")[0];
    //get the upper limit
    const upperLimit = recommendedRange[1].split("min")[0];
    //check if the value is within the recommended range
    if(parseFloat(speaker_0[0].longestCustomerStory.value) > parseFloat(lowerLimit) && parseFloat(speaker_0[0].longestCustomerStory.value) < parseFloat(upperLimit)){
      return `Within recommended range, keep it between ${lowerLimit} mins to ${upperLimit} mins`
    }
    else
    {
      return `Not within recommended range, keep it between ${lowerLimit} mins to ${upperLimit} mins`
    }
  }

  function interactivityCheck(){
    const recommended = speaker_0[0].Interactivity.recommend;
    //its of the form Above 5 or Below 5 get value by splitting
    if(recommended.includes("Below")){
      //get the value
      const value = recommended.split("Below")[1];
      //check if the value is less than the recommended value
      if(parseFloat(speaker_0[0].Interactivity.value) < parseFloat(value)){
        return `Within recommended range, keep it below ${value}`
      }
      else{
        return `Not within recommended range, keep it below ${value}`
      }
    }
    else{
      //get the value
      const value = recommended.split("Above")[1];
      //check if the value is greater than the recommended value
      if(parseFloat(speaker_0[0].Interactivity.value) > parseFloat(value)){
        return `Within recommended range, keep it above ${value}`
      }
      else{
        return `Not within recommended range, keep it above ${value}`
      }
    }
  }

  function patienceCheck(){
    const recommended = speaker_0[0].patience.recommend;
    //its of the form 0.6~1.2 get value by splitting
    const recommendedRange = recommended.split("~");
    //get the lower limit
    const lowerLimit = recommendedRange[0];
    //get the upper limit
    const upperLimit = recommendedRange[1];
    //check if the value is within the recommended range
    if(parseFloat(speaker_0[0].patience.value) > parseFloat(lowerLimit) && parseFloat(speaker_0[0].patience.value) < parseFloat(upperLimit)){
      return `Within recommended range, keep it between ${lowerLimit} secs to ${upperLimit} secs`
    }
    else
    {
      return `Not within recommended range, keep it between ${lowerLimit} secs to ${upperLimit} secs`
    }
  }

  return (
    <div className={styles.statsWrapper}>
      <div className={styles.stats}>
        <div className={styles.statsHeading}>
          <p>Interaction Stats</p>
        </div>
        <div className={styles.statsTip}>
          <Image src={tips} alt="" />
          <p>1 tip for employee.</p>
        </div>
        {speaker_0.length > 0 ? (<>
        <div className={styles.statsContainer}>
          <div className={styles.containerHeading}>Talk Ratio</div>
          <div className={styles.containerHeading}>{speaker_0[0].talkRatio.value}%</div>
          <div className={styles.containerSub}>
            <div className={styles.circle}></div>
            <div className={styles.text}>
              {
                talkRatioCheck()
              }
            </div>
          </div>
        </div>
        <div className={styles.statsContainer}>
          <div className={styles.containerHeading}>Longest Monologue</div>
          <div className={styles.containerHeading}>{speaker_0[0].longestMonologue.value} mins</div>
          <div className={styles.containerSub}>
            <div className={styles.circle}></div>
            <div className={styles.text}>
              {
                longMonoCheck()
              }
            </div>
          </div>
        </div>
        <div className={styles.statsContainer}>
          <div className={styles.containerHeading}>Longest Customer Story</div>
          <div className={styles.containerHeading}>{speaker_0[0].longestCustomerStory.value} mins</div>
          <div className={styles.containerSub}>
            <div className={styles.circle}></div>
            <div className={styles.text}>
              {
                longCusStoryCheck()
              }
            </div>
          </div>
        </div>
        <div className={styles.statsContainer}>
          <div className={styles.containerHeading}>Interactivity</div>
          <div className={styles.containerHeading}>{speaker_0[0].Interactivity.value.split(':')[0]}%</div>
          <div className={styles.containerSub}>
            <div className={styles.circle} style={{ backgroundColor: "rgb(232, 232, 18)" }}></div>
            <div className={styles.text}>
              {
                interactivityCheck()
              }
            </div>
          </div>
        </div>
        <div className={styles.statsContainer}>
          <div className={styles.containerHeading}>Patience</div>
          <div className={styles.containerHeading}>{speaker_0[0].patience.value} secs</div>
          <div className={styles.containerSub}>
            <div className={styles.circle}></div>
            <div className={styles.text}>
              {
                patienceCheck()
              }
            </div>
          </div>
        </div>
        <div className={styles.statsContainer} style={{ borderBottom: "0px", background: '#F4F8FF', borderRadius: '5px', marginBottom: '22px', alignItems: 'center', paddingTop: '10px', gap: '20px',marginTop:'30px' }}>
          <div className={styles.call_detailshead}>Call Details:</div>
          <div className={styles.call_deatilsbody}>
            <div className={styles.call_detailshead}>{userDetails.name}, {userDetails.role}</div>
            <ul>
              <li>Primary Rep</li>
            </ul>
          </div>
        </div>
        </>
        ) : (
          //model is analysing
          <div className={styles.statsContainer} style={{ borderBottom: "0px", background: '#F4F8FF', borderRadius: '5px', marginBottom: '22px', alignItems: 'center', paddingTop: '10px', gap: '20px',marginTop:'30px' }}>
                our model is analysing the data, please come back in a few minutes....
          </div>
        )
        }
      </div>
    </div>
  )
}

export default Stats