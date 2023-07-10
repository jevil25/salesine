import styles from '../styles/Transcript.module.css'

const Transcript = (props) => {
    console.log(props.transcript)
    return (
        <div className={styles.app__transcript}>
            <div className={styles.transcriptWrapper}>
                <div className={styles.wrapHead}>Transcripted Conversation:</div>
                <div className={styles.transcriptBody}>
                    {
                        props.transcript.map((item, index) => {
                            return ((index%2) === 0) ?
                            <div className={styles.chatt}>
                                <div className={styles.speakerName}>Aadarsh</div>
                                <div className={styles.speakerText}>{item.text}</div>
                            </div>
                            :
                            <div className={styles.chatt}>
                                <div className={styles.speakerName}>Ashwini</div>
                                <div className={styles.speakerText}>{item.text}</div>
                            </div>
                        }
                    )}
                </div>
            </div>
            <div className={styles.summary}>
                <div className={styles.sumHead}>Last Call Summary:</div>
                <div className={styles.sumBody}>"The KALDI is releasing some models, called the release some models trained on the English. You can find them on the on their website. Called, they have free train, the model for the English. Cultivating in c++, with interface. Because written Java."</div>
            </div>
        </div>
    )
}

export default Transcript