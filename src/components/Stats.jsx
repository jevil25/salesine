import styles from '../styles/Stats.module.css'
import tips from '../../public/assets/tips.png'
import Image from "next/image";

const Stats = () => {
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
        <div className={styles.statsContainer}>
          <div className={styles.containerHeading}>Talk Ratio</div>
          <div className={styles.containerHeading}>11%</div>
          <div className={styles.containerSub}>
            <div className={styles.circle}></div>
            <div className={styles.text}>
              Within recommended range
            </div>
          </div>
        </div>
        <div className={styles.statsContainer}>
          <div className={styles.containerHeading}>Longest Monologue</div>
          <div className={styles.containerHeading}>2:09min</div>
          <div className={styles.containerSub}>
            <div className={styles.circle}></div>
            <div className={styles.text}>
              Within recommended range
            </div>
          </div>
        </div>
        <div className={styles.statsContainer}>
          <div className={styles.containerHeading}>Longest Customer Story</div>
          <div className={styles.containerHeading}>4:14min</div>
          <div className={styles.containerSub}>
            <div className={styles.circle}></div>
            <div className={styles.text}>
              Within recommended range
            </div>
          </div>
        </div>
        <div className={styles.statsContainer}>
          <div className={styles.containerHeading}>Interactivity</div>
          <div className={styles.containerHeading}>2.7</div>
          <div className={styles.containerSub}>
            <div className={styles.circle} style={{ backgroundColor: "rgb(232, 232, 18)" }}></div>
            <div className={styles.text}>
              Within recommended range
            </div>
          </div>
        </div>
        <div className={styles.statsContainer}>
          <div className={styles.containerHeading}>Patience</div>
          <div className={styles.containerHeading}>1.29 secs</div>
          <div className={styles.containerSub}>
            <div className={styles.circle}></div>
            <div className={styles.text}>
              Within recommended range
            </div>
          </div>
        </div>
        <div className={styles.statsContainer} style={{ borderBottom: "0px", background: '#F4F8FF', borderRadius: '5px', marginBottom: '22px', alignItems: 'center', paddingTop: '10px', gap: '20px',marginTop:'30px' }}>
          <div className={styles.call_detailshead}>Call Details:</div>
          <div className={styles.call_deatilsbody}>
            <div className={styles.call_detailshead}>Raj, Account Executive</div>
            <ul>
              <li>Primary Rep</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stats