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
                            return (
                            <div className={styles.chatt}>
                                <div className={styles.speakerName}>{`Speaker${item.speaker+1}`}</div>
                                <div className={styles.speakerText}>{item.text}</div>
                            </div>
                            )
                        }
                    )}
                </div>
            </div>
            <div className={styles.summary}>
                <div className={styles.sumHead}>Last Call Summary:</div>
                <div className={styles.sumBody}>{props.summary}</div>
            </div>
        </div>
    )
}

export default Transcript