import styles from '../styles/Interest.module.css'
import { useEffect, useState } from 'react'

const Interest = ({ trackers,meetHost }) => {
    const [tracker,setTracker] = useState(trackers)
    const [keys, setKeys] = useState([])
    const [userDetails, setUserDetails] = useState({
        name: '',
        role: ''
    })
    if (trackers === undefined || trackers === null) {
        return <div className={styles.interestWrapper}>
            <div className={styles.interestHeading}>
                <p>Point of Interest</p>
            </div>
            <div className={styles.interestSearch}>
                <input type="text" placeholder='Search for Keywords.' />
            </div>
            <div className={styles.actionItems}>
                <div className={styles.actionItemHeading}>TRACKERS</div>
                <div className={styles.trackersItem}>
                    <div className={styles.trackerItemSubHeading}>
                        <div className={styles.trackItem}>
                            <div className={styles.itemName}>No trackers found, Our Model is processing your video</div>
                        </div>
                    </div>
                </div>
                <div className={styles.statsContainer} style={{ borderBottom: "0px", background: '#F4F8FF', borderRadius: '5px', marginBottom: '20px', alignItems: 'center', paddingTop: '10px', gap: '10px',marginTop:'5px' }}>
                <div className={styles.call_detailshead}>Call Details:</div>
                    <div className={styles.call_deatilsbody}>
                        <div className={styles.call_detailshead}>{userDetails.name}, {userDetails.role}</div>
                        <ul>
                            <li>Primary Rep</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    }
    const [meetHostId, setMeetHostId] = useState(meetHost)
    //get keys from trackers object
    useEffect(() => {
        setKeys(Object.keys(trackers))
    }, [tracker])

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

    return (
        <div className={styles.interestWrapper}>
            <div className={styles.interestHeading}>
                <p>Point of Interest</p>
            </div>
            <div className={styles.interestSearch}>
                <input type="text" placeholder='Search for Keywords.' />
            </div>
            {/* <div className={styles.actionItems}>
                <div className={styles.actionItemHeading}>ACTION ITEMS</div>
                <div className={styles.actionItemSubHeading}>
                    <div className={styles.subText}>ABC Company action-items</div>
                </div>
                <div className={styles.interestDivider}></div>
            </div>
            <div className={styles.actionItems}>
                <div className={styles.actionItemHeading}>QUESTIONS</div>
                <div className={styles.actionItemSubHeading}>
                    <div className={styles.subText}>Asked by ABC Company</div>
                </div>
                <div className={styles.actionItemSubHeading}>
                    <div className={styles.subText}>Asked by Others</div>
                </div>
                <div className={styles.interestDivider}></div>
            </div> */}
            {/* <div className={styles.actionItems}>
                <div className={styles.actionItemHeading}>SMART TRACKERS</div>
                <div className={styles.actionItemSubHeading}>
                    <div className={styles.subText}>Discovery Questions</div>
                </div>
                <div className={styles.actionItemSubHeading}>
                    <div className={styles.subText}>Pricing Objections</div>
                </div>
                <div className={styles.interestDivider}></div>
            </div> */}
            <div className={styles.actionItems}>
                <div className={styles.actionItemHeading}>TRACKERS</div>
                <div className={styles.trackersItem}>
                    <div className={styles.trackerItemSubHeading}>
                        {keys.length > 0 ? keys.map((key, index) => {
                        return <div className={styles.trackItem}>
                            <div className={styles.itemName}>{key}</div>
                        </div>
                        }) : "No trackers found, Please contact your admin to add trackers."}
                    </div>
                </div>
                {/* <div className={styles.trackersItem}>
                    <div className={styles.trackerItemHeading}>ABC COMPANY NARRATIVE DEMO</div>
                    <div className={styles.trackerItemSubHeading}>
                        <div className={styles.trackItem}>
                            <div className={styles.itemName}>aligned</div>
                        </div>
                    </div>
                </div>
                <div className={styles.trackersItem}>
                    <div className={styles.trackerItemHeading}>SALES METHODOLOGY</div>
                    <div className={styles.trackerItemSubHeading}>
                        <div className={styles.trackItem}>
                            <div className={styles.itemName}>imagine</div>
                        </div>
                        <div className={styles.trackItem}>
                            <div className={styles.itemName}>impact</div>
                        </div>
                    </div>
                </div>
                <div className={styles.trackersItem}>
                    <div className={styles.trackerItemHeading}>DECISION CRITERIA</div>
                    <div className={styles.trackerItemSubHeading}>
                        <div className={styles.trackItem}>
                            <div className={styles.itemName}>four accounts</div>
                        </div>
                        <div className={styles.trackItem}>
                            <div className={styles.itemName}>50 calls</div>
                        </div>
                        <div className={styles.trackItem}>
                            <div className={styles.itemName}>10 users</div>
                        </div>
                    </div>
                </div> */}
                <div className={styles.statsContainer} style={{ borderBottom: "0px", background: '#F4F8FF', borderRadius: '5px', marginBottom: '20px', alignItems: 'center', paddingTop: '10px', gap: '10px',marginTop:'5px' }}>
                    <div className={styles.call_detailshead}>Call Details:</div>
                    <div className={styles.call_deatilsbody}>
                        <div className={styles.call_detailshead}>{userDetails.name}, {userDetails.role}</div>
                        <ul>
                            <li>Primary Rep</li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Interest