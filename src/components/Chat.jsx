import styles from '../styles/Chat.module.css'
import Hellen from '../../public/assets/Hellen.png'
import Hellen2 from '../../public/assets/hellen2.png'

const Chat = (props) => {

    return (
        <div className={styles.chatContainer}>
            <div className={styles.chatHeading}>
                <p>Group Chats</p>
            </div>
            <div className={styles.chatSearch}>
                <input type="text" placeholder='Search for meetings.' />
                <img src="https://img.icons8.com/ios-filled/20/ADA8A7/search--v1.png" alt="search" />
            </div>
            <div className={styles.chat}>
                <div className={styles.reciever}>
                    <img src={Hellen2} alt="" style={{ width: "50px", height: "50px" }} />
                    <div className={styles.recieverText}>
                        <p>Lorem ipsum dolor sit.</p>
                    </div>
                </div>
                <div className={styles.reciever}>
                    <img src={Hellen2} alt="" style={{ width: "50px", height: "50px" }} />
                    <div className={styles.recieverText}>
                        <p>Lorem ipsum dolor sit.</p>
                    </div>
                </div>
                <div className={styles.sender}>
                    <div className={styles.senderText}>
                        <p>Lorem ipsum dolor sit amet.</p>
                    </div>
                    <img src={Hellen} alt="" style={{ width: "50px", height: "50px" }} />
                </div>
                <div className={styles.reciever}>
                    <img src={Hellen2} alt="" style={{ width: "50px", height: "50px" }} />
                    <div className={styles.recieverText}>
                        <p>Lorem ipsum dolor sit.</p>
                    </div>
                </div>
                <div className={styles.sender}>
                    <div className={styles.senderText}>
                        <p>Lorem ipsum dolor sit amet.</p>
                    </div>
                    <img src={Hellen} alt="" style={{ width: "40px", height: "40px" }} />
                </div>
                <div className={styles.reciever}>
                    <img src={Hellen2} alt="" style={{ width: "40px", height: "40px" }} />
                    <div className={styles.recieverText}>
                        <p>Lorem ipsum dolor sit.</p>
                    </div>
                </div>
                <div className={styles.sender}>
                    <div className={styles.senderText}>
                        <p>Lorem ipsum dolor sit amet.</p>
                    </div>
                    <img src={Hellen} alt="" style={{ width: "50px", height: "50px" }} />
                </div>
                <div className={styles.reciever}>
                    <img src={Hellen2} alt="" style={{ width: "50px", height: "50px" }} />
                    <div className={styles.recieverText}>
                        <p>Lorem ipsum dolor sit.</p>
                    </div>
                </div>
            </div>
            <div className={styles.message}>
                <textarea placeholder='Message..' />
                <div className={styles.button1}>
                    <p>Send</p>
                </div>
            </div>
        </div>
    )
}

export default Chat