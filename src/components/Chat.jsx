import styles from '../styles/Chat.module.css'
import Hellen from '../../public/assets/Hellen.png'
import Hellen2 from '../../public/assets/hellen2.png'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import bin from '../../public/assets/dustbin.png'
import Image from 'next/image'
import { Button } from '@mantine/core'

const Chat = ({ comments,meet_id,getdata }) => {
    const [email, setEmail] = useState('')
    const [text1, setText1] = useState('')
    const BACK_END_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000" ;
    const router = useRouter()

    useEffect(() => {
        if(window){
            setEmail(localStorage.getItem('email'))
        }
    }, [router.isReady])

    async function sendMessage() {
        let text = text1;
        setText1("");
        let timestamp = Date.now();
        const email = localStorage.getItem("email");
        const updated_meet = await fetch(`${BACK_END_URL}/Sendmessage`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            meet_id: meet_id,
            text: text,
            author: email,
            flag:"send"
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data.message);
            getdata();
          });
      }

      const formatTime = (timestamp) => {
        const d = new Date(timestamp);
        const time = `${d.getDate()}/${(d.getMonth() + 1)}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
        return time;
        };

        async function deleteMsg(comment_id){
            console.log("in delete msg func")
            const updated_meet = await fetch(`${BACK_END_URL}/Sendmessage`,{
                method:'POST',
                headers:{
                  'Content-Type':'application/json'
                },
                body:JSON.stringify({
                  id:comment_id,
                  meet_id:meet_id,
                  flag:"delete"
                }),
              }).then((res)=>res.json()).then((data)=>{
                if(data.message=="Comment deleted successfully"){
                  getdata()
                }
              }
              )
            console.log(updated_meet)
          }
            

    return (
        <div className={styles.chatContainer}>
            <div className={styles.chatHeading}>
                <p>Group Chats</p>
            </div>
            <div className={styles.chatSearch}>
                <input type="text" placeholder='Search for meetings.' />
                {/* <Image src={"https://img.icons8.com/ios-filled/20/ADA8A7/search--v1.png"} width={10} height={10} alt="search" /> */}
            </div>
            <div className={styles.chat}>
                {comments.length === 0 && <p>No messages yet</p>}
                {comments.map((comment) => (
                    comment.author === email ?
                    <div className={styles.sender}>
                        <div className={styles.senderText}>
                            <p>{comment.text}</p>
                            <div style={{fontSize : "10px" , display:"flex", flexDirection:"row",gap:"5px"}}>
                                <p>{comment.author}</p>
                                <p>{formatTime(comment.timestamp)}</p>
                                <Button
                                  onClick={e => deleteMsg(comment.id)}
                                  variant='outline'
                                >
                                  <Image src={bin} style={{cursor:"pointer" }} width={15} alt="bin" />
                                </Button>
                            </div>
                        </div>
                        <Image src={Hellen} alt="" style={{ width: "50px", height: "50px" }} />
                    </div>
                :
                    <div className={styles.reciever}>
                        <Image src={Hellen2} alt="" style={{ width: "50px", height: "50px" }} />
                        <div className={styles.recieverText}>
                            <p>{comment.text}</p>
                            <div style={{fontSize : "10px" , display:"flex", flexDirection:"row",gap:"5px"}}>
                                <p>{comment.author}</p>
                                <p>{formatTime(comment.timestamp)}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.message}>
                <textarea placeholder='Message..' onChange={e => setText1(e.target.value)} value={text1} />
                <div className={styles.button1} style={{cursor:"pointer"}}>
                    <Button
                      variant="subtle"
                      onClick={sendMessage}
                      style={{color:"#000000"}}
                    >
                      Send
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Chat