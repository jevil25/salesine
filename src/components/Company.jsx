import styles from '../styles/Company.module.css'
import search from '../../public/assets/search.png'
import caller from '../../public/assets/caller.png'
import mail from '../../public/assets/mail.png'
import calendar from '../../public/assets/calendar.png'
import preview from '../../public/assets/preview.png'
import Vector from '../../public/assets/Vector.png'
import Rectangle from '../../public/assets/Rectangle.png'
import { useState } from 'react'
import Image from "next/image";

export const conversations = [
    {
        id: 1, name: "Michael S.", date: '21 Sept 22', convo: "She said ‘Maybe next quarter’ as soon as we talked about pricing? Did I miss something?", icon: caller, details: [
            { id: 1, name: "Michael S.", convo: "Called the KALDI is releasing some models, called the release some models trained on the English. You can find them on the on their website. Called, they have free train, the model for the English." },
            { id: 2, name: "Raj", convo: "Okay, is it written calories written Python or Java? I think it is. Because written Java." },
            { id: 3, name: "Michael S.", convo: "Cultivating in c++, with interface\n with patch interface but so the training can be done easily using this special scripts, but for the production we can build a person engine with that can work. Using the pointers of gold." },
            { id: 4, name: "Raj", convo: "so, initially how much amount of data will be needed for the training,\n we can start, as you say,\n Okay, Salah. I have no one more question." },
            { id: 5, name: "Michael S.", convo: "Okay, go ahead" },
        ], participants: [
            { id: 1, name: "Michael S.", post: "BDR Manager", company: "Acme Co." },
            { id: 1, name: "Raj", post: "Account Executive", company: "Softbuilt" },
        ]
    },
    {
        id: 2, name: "Michael S.", date: '', convo: "She said ‘Maybe next quarter’ as soon as we talked about pricing? Did I miss something?", icon: mail, details: [
            { id: 1, name: "Michael S.", convo: "Called the KALDI is releasing some models, called the release some models trained on the English. You can find them on the on their website. Called, they have free train, the model for the English." },
            { id: 2, name: "Raj", convo: "Okay, is it written calories written Python or Java? I think it is. Because written Java." },
            { id: 3, name: "Michael S.", convo: "Cultivating in c++, with interface\n with patch interface but so the training can be done easily using this special scripts, but for the production we can build a person engine with that can work. Using the pointers of gold." },
            { id: 4, name: "Raj", convo: "so, initially how much amount of data will be needed for the training,\n we can start, as you say,\n Okay, Salah. I have no one more question." },
            { id: 5, name: "Michael S.", convo: "Okay, go ahead" },
        ], participants: [
            { id: 1, name: "Michael S.", post: "BDR Manager", company: "Acme Co." },
            { id: 1, name: "Raj", post: "Account Executive", company: "Softbuilt" },
        ]
    },
    {
        id: 3, name: "Michael S.", date: '', convo: "She said ‘Maybe next quarter’ as soon as we talked about pricing? Did I miss something?", icon: mail, details: [
            { id: 1, name: "Michael S.", convo: "Called the KALDI is releasing some models, called the release some models trained on the English. You can find them on the on their website. Called, they have free train, the model for the English." },
            { id: 2, name: "Raj", convo: "Okay, is it written calories written Python or Java? I think it is. Because written Java." },
            { id: 3, name: "Michael S.", convo: "Cultivating in c++, with interface\n with patch interface but so the training can be done easily using this special scripts, but for the production we can build a person engine with that can work. Using the pointers of gold." },
            { id: 4, name: "Raj", convo: "so, initially how much amount of data will be needed for the training,\n we can start, as you say,\n Okay, Salah. I have no one more question." },
            { id: 5, name: "Michael S.", convo: "Okay, go ahead" },
        ], participants: [
            { id: 1, name: "Michael S.", post: "BDR Manager", company: "Acme Co." },
            { id: 1, name: "Raj", post: "Account Executive", company: "Softbuilt" },
        ]
    },
    {
        id: 4, name: "Michael S.", date: '', convo: "She said ‘Maybe next quarter’ as soon as we talked about pricing? Did I miss something?", icon: caller, details: [
            { id: 1, name: "Michael S.", convo: "Called the KALDI is releasing some models, called the release some models trained on the English. You can find them on the on their website. Called, they have free train, the model for the English." },
            { id: 2, name: "Raj", convo: "Okay, is it written calories written Python or Java? I think it is. Because written Java." },
            { id: 3, name: "Michael S.", convo: "Cultivating in c++, with interface\n with patch interface but so the training can be done easily using this special scripts, but for the production we can build a person engine with that can work. Using the pointers of gold." },
            { id: 4, name: "Raj", convo: "so, initially how much amount of data will be needed for the training,\n we can start, as you say,\n Okay, Salah. I have no one more question." },
            { id: 5, name: "Michael S.", convo: "Okay, go ahead" },
        ], participants: [
            { id: 1, name: "Michael S.", post: "BDR Manager", company: "Acme Co." },
            { id: 1, name: "Raj", post: "Account Executive", company: "Softbuilt" },
        ]
    },
    {
        id: 5, name: "Michael S.", date: '', convo: "She said ‘Maybe next quarter’ as soon as we talked about pricing? Did I miss something?", icon: mail, details: [
            { id: 1, name: "Michael S.", convo: "Called the KALDI is releasing some models, called the release some models trained on the English. You can find them on the on their website. Called, they have free train, the model for the English." },
            { id: 2, name: "Raj", convo: "Okay, is it written calories written Python or Java? I think it is. Because written Java." },
            { id: 3, name: "Michael S.", convo: "Cultivating in c++, with interface\n with patch interface but so the training can be done easily using this special scripts, but for the production we can build a person engine with that can work. Using the pointers of gold." },
            { id: 4, name: "Raj", convo: "so, initially how much amount of data will be needed for the training,\n we can start, as you say,\n Okay, Salah. I have no one more question." },
            { id: 5, name: "Michael S.", convo: "Okay, go ahead" },
        ], participants: [
            { id: 1, name: "Michael S.", post: "BDR Manager", company: "Acme Co." },
            { id: 1, name: "Raj", post: "Account Executive", company: "Softbuilt" },
        ]
    },
    {
        id: 6, name: "Michael S.", date: '', convo: "She said ‘Maybe next quarter’ as soon as we talked about pricing? Did I miss something?", icon: caller, details: [
            { id: 1, name: "Michael S.", convo: "Called the KALDI is releasing some models, called the release some models trained on the English. You can find them on the on their website. Called, they have free train, the model for the English." },
            { id: 2, name: "Raj", convo: "Okay, is it written calories written Python or Java? I think it is. Because written Java." },
            { id: 3, name: "Michael S.", convo: "Cultivating in c++, with interface\n with patch interface but so the training can be done easily using this special scripts, but for the production we can build a person engine with that can work. Using the pointers of gold." },
            { id: 4, name: "Raj", convo: "so, initially how much amount of data will be needed for the training,\n we can start, as you say,\n Okay, Salah. I have no one more question." },
            { id: 5, name: "Michael S.", convo: "Okay, go ahead" },
        ], participants: [
            { id: 1, name: "Michael S.", post: "BDR Manager", company: "Acme Co." },
            { id: 1, name: "Raj", post: "Account Executive", company: "Softbuilt" },
        ]
    },
]

const Company = () => {

    const [show, setShow] = useState(false)
    const [data, setdata] = useState(null)
    const [ids, setID] = useState(null)

    const handleClick = (id) => {
        setShow(true)
        setID(id)
        const datas = conversations.filter(x => x.id === id)
        console.log(datas)
        setdata(datas)
    }
    return (
        <div className={styles.companyWrapper}>
            <div className={styles.companySideBar}>
                <div className={styles.sideBar1}>
                    <div className={styles.sideBar1Head}>
                        <div style={{ fontFamily: 'Arial', fontSize: '20px', fontWeight: '700' }}>Acme Co.</div>
                    </div>
                    <div className={styles.sideBar1Body}>
                        <div style={{ fontFamily: 'Arial', fontSize: '14px', fontWeight: '400' }}>Deal size: $37,500</div>
                        <div style={{ fontFamily: 'Arial', fontSize: '14px', fontWeight: '400' }}>Close Deal: in 1 month</div>
                        <div style={{ fontFamily: 'Arial', fontSize: '14px', fontWeight: '400' }}>Deal Stage: Technical Evalution</div>
                        <div style={{ fontFamily: 'Arial', fontSize: '14px', fontWeight: '400' }}>Deal owner: Alex</div>
                    </div>
                </div>
                <div className={styles.sideBar2}>
                    <div className={styles.sideBar2Head}>
                        <div className={styles.sideBar2Header}>Conversations</div>
                    </div>
                    <div className={styles.sideBar2Body}>
                        <div className={styles.sideBarSearch}>
                            <input type="text" placeholder='Search for conversations..' />
                            <Image src={search} alt="" />
                        </div>
                        {conversations.map((conversation, i) => (
                            <div className={styles.sideBarCard} key={conversation.id} onClick={() => handleClick(conversation.id)} style = {{backgroundColor:conversation.id===ids?'#E5EFFF':''}}>
                                <div className={styles.cardLogo}>
                                    <Image src={conversation.icon} alt="" />
                                </div>
                                <div className={styles.cardBody}>
                                    <div className={styles.cardHeader}>
                                        <div className={styles.cardName}>{conversation.name}</div>
                                        <div className={styles.cardDate}>{conversation.date}</div>
                                    </div>
                                    <div className={styles.cardConvo}>{conversation.convo}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.companyRightBar}>
                <div className={styles.rightBar1}>
                    <div className={styles.timeline}>
                        <div className={styles.time1}>
                            <div className={styles.lineTime}></div>
                            <div className={styles.month}>Sept 22</div>
                        </div>
                        <div className={styles.time1}>
                            <div className={styles.lineTime}></div>
                            <div className={styles.month}>Oct 22</div>
                        </div>
                        <div className={styles.time1}>
                            <div className={styles.lineTime}></div>
                            <div className={styles.month}>Nov 22</div>
                        </div>
                    </div>
                    <div className={styles.iconBox}>
                        <div className={styles.nextBox}>
                            <Image src={Rectangle} alt="" />
                            <div className={styles.nextAbsol}>
                                <Image src={Vector} alt="" />
                            </div>
                        </div>
                        <div className={styles.box1}>
                            <Image src={caller} alt="" />
                            <Image src={mail} alt="" />
                            <Image src={mail} alt="" />
                        </div>
                        <div className={styles.box1}>
                            <Image src={caller} alt="" />
                            <Image src={mail} alt="" />
                            <Image src={mail} alt="" />
                        </div>
                        <div className={styles.box1}>
                            <Image src={caller} alt="" />
                            <Image src={mail} alt="" />
                            <Image src={mail} alt="" />
                        </div>
                        <div className={styles.box1}>
                            <Image src={caller} alt="" />
                            <Image src={mail} alt="" />
                            <Image src={mail} alt="" />
                        </div>
                        <div className={styles.box1}>
                            <Image src={caller} alt="" />
                            <Image src={mail} alt="" />
                            <Image src={mail} alt="" />
                        </div>
                        <div className={styles.box1}>
                            <Image src={caller} alt="" />
                            <Image src={mail} alt="" />
                            <Image src={mail} alt="" />
                        </div>
                        <div className={styles.nextBox} style={{ transform: 'rotate(180deg)' }}>
                            <Image src={Rectangle} alt="" />
                            <div className={styles.nextAbsol}>
                                <Image src={Vector} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={show ? styles.rightbar : styles.rightBar2}>
                    {!show && <>
                        <Image src={preview} alt="" />
                        <div>Conversations are shown here</div>
                    </>}
                    {show &&
                        <div className={styles.rightbar__main}>
                            <div className={styles.rightbar__main1}>
                                <div className={styles.rightbar__main11}>
                                    <div>Deal closing meeting</div>
                                    <div style={{borderRight:'2px solid black',borderLeft:'2px solid black',padding:'0px 5px 0px 5px'}}>{data[0].name}</div>
                                    <div>Acme Co.</div>
                                </div>
                                <div className={styles.rightbar__main12}>
                                    <Image src={calendar} alt="" />
                                    <div>{data[0].date}</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex',gap:'10px', borderBottom:'1px solid #D1E3FF',paddingBottom:'5px' }}>
                                <div style = {{color:'rgba(0,0,0,0.7'}}>Participants:</div>
                                <div>
                                    {data[0].participants.map((p, i) => (
                                        <div key={i} style={{ color: '#3F51B5', fontWeight: '400', }}>{p.name} ({p.post},{p.company})</div>
                                    ))}
                                </div>
                            </div>
                            {data[0].details.map((d,i)=>(
                                <div key={i} style={{paddingBottom:'5px' ,borderBottom: '1px solid #D1E3FF'}}>
                                    <div style={{fontWeight:'400'}}>{d.name}</div>
                                    <div style={{color:'#606060'}}>{d.convo}</div>
                                </div>
                            ))}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Company