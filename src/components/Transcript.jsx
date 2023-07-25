import { set } from 'mongoose'
import styles from '../styles/Transcript.module.css'
import { useEffect, useState } from 'react'

const Transcript = (props) => {
    const [speakerName, setSpeakerName] = useState([])
    const [fetching, setFetching] = useState(true)
    useEffect(() => {
        const getSpeakerName = (speaker) => {
            if(speakerName.length > 0) {
                return speakerName[0][speaker];
            }
            try{
                return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getUserDetailsById`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: speaker
                    })
                })
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    return data.user.name;
                })
                .catch(err => console.log(err))
            } catch(err) {
                console.log(err)
            }
        }
        async function getname(){
            if(!fetching) return;
            for(let i = 0; i < props.transcript.length; i++) {
                if(props.transcript[i].speaker.length > 10) {
                const name = await getSpeakerName(props.transcript[i].speaker)
                console.log(name)
                //make object of speaker and name
                setSpeakerName(prev => [...prev, {[props.transcript[i].speaker]: name}])
                }
            }
        }
        if(fetching){
            getname();
            setFetching(false)
            console.log(speakerName)
        }
    }, [fetching])
    return (
        <div className={styles.app__transcript}>
            <div className={styles.transcriptWrapper}>
                <div className={styles.wrapHead}>Transcripted Conversation:</div>
                <div className={styles.transcriptBody}>
                    {
                        props.transcript.map((item, index) => {
                            console.log(speakerName)
                            return (
                            <div className={styles.chatt}>
                                <div className={styles.speakerName}>{`${item.speaker.length>10 && speakerName.length>0 ? speakerName[0][item.speaker]:`speaker${item.speaker}`}`}</div>
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