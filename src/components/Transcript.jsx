import styles from '../styles/Transcript.module.css'

const Transcript = (props) => {
    return (
        <div className={styles.app__transcript}>
            <div className={styles.transcriptWrapper}>
                <div className={styles.wrapHead}>Transcripted Conversation:</div>
                <div className={styles.transcriptBody}>
                    <div className={styles.chatt}>
                        <div className={styles.speakerName}>Aadarsh</div>
                        <div className={styles.speakerText}>Called the KALDI is releasing some models, called the release some models trained on the English. You can find them on the on their website. Called, they have free train, the model for the English.</div>
                    </div>
                    <div className={styles.chatt}>
                        <div className={styles.speakerName}>Ashwini</div>
                        <div className={styles.speakerText}>Okay, is it written calories written Python or Java? I think it is. Because written Java.</div>
                    </div>
                    <div className={styles.chatt}>
                        <div className={styles.speakerName}>Aadarsh</div>
                        <div className={styles.speakerText}>Cultivating in c++, with interface with patch interface but so the training can be done easily using this special scripts, but for the production we can build a person engine with that can work. Using the pointers of gold.</div>
                    </div>
                    <div className={styles.chatt}>
                        <div className={styles.speakerName}>Ashwini</div>
                        <div className={styles.speakerText}>so, initially how much amount of data will be needed for the training, we can start, as you say, Okay, Salah. I have no one more question.</div>
                    </div>
                    <div className={styles.chatt}>
                        <div className={styles.speakerName}>Aadarsh</div>
                        <div className={styles.speakerText}>Okay, go ahead.</div>
                    </div>
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