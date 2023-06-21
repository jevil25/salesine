import React from 'react'
import Navbar from '../components/Navbar'
import styles from '../styles/Index.module.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import performer from '../../public/assets/performer.png'
import call from '../../public/assets/call.png'
import msg2 from '../../public/assets/msg2.png'
import phone from '../../public/assets/phone.png'
import { Pie } from 'react-chartjs-2'
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import fetch from 'node-fetch';


ChartJS.register(ArcElement, Tooltip, Legend);

export const todayHighlight = [
    { id: 1, heading: 'Heading', date: 'Jul 19, 2022', RepsName: 'Reps Name', companyName: 'ABC Company' },
    { id: 2, heading: 'Heading', date: 'Jul 19, 2022', RepsName: 'Reps Name', companyName: 'ABC Company' },
    { id: 3, heading: 'Heading', date: 'Jul 19, 2022', RepsName: 'Reps Name', companyName: 'ABC Company' },
    { id: 3, heading: 'Heading', date: 'Jul 19, 2022', RepsName: 'Reps Name', companyName: 'ABC Company' },
]

export const myChart = {
    labels: ['Extremely well', 'Somewhat well', 'Not so well'],
    datasets: [{
        label: '%',
        data: [40, 230, 90],
        backgroundColor: ['#888888', '#E5EFFF', '#3F51B5'],
    }]
}

const Home = () => {
    const router = useRouter();
    const BACKEND_URL="http://localhost:4000";
    useEffect (() => {
        if(typeof window !== 'undefined') {
            if(localStorage.getItem('token')){
                const token = localStorage.getItem('token');
                const email = localStorage.getItem('email');

                fetch(`${BACKEND_URL}/validate`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ token, email }),
                        })
                        .then((res) => res.json())
                        .then((data) => {
                            console.log(data);
                            if (data.status === 200) {
                                console.log("success")
                            }
                            if(data.status === 401){
                                localStorage.removeItem('token');
                                localStorage.removeItem('email');
                                router.push('/login');
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        }
                    );
            }
        }
    }, [typeof window])

   
    // const router = useRouter();
    // const { 
    //     query: { code } 
    // } = router;
    // if(typeof window !== 'undefined') {
    //     if(localStorage.getItem('token') === null) {
    //         router.push('/login');
    //     }
    // }
    
    return (
        <>
            <Navbar type='home' />
            <div className={styles.homeWrapper}>
                <div className={styles.homeHeader}>
                    <div className={styles.homeHeaderHeading}>Dashboard</div>
                </div>
                <div className={styles.homeBody}>
                    <div className={styles.homeBody1}>
                        <div className={styles.homeBody1Part1}>
                            <div className={styles.part1part1}>
                                <div className={styles.partHead}>Total Deals</div>
                                <div className={styles.partNumber}>150</div>
                            </div>
                            <div className={styles.part1part1}>
                                <div className={styles.partHead}>Closed Deals</div>
                                <div className={styles.partNumber}>90</div>
                            </div>
                            <div className={styles.part1part1}>
                                <div className={styles.partHead}>Active Deals</div>
                                <div className={styles.partNumber}>60</div>
                            </div>
                        </div>
                        <div className={styles.homeBody1Part2}>
                            <div className={styles.partHead}>Today's Highlight</div>
                            {
                                todayHighlight.map((data, i) => (
                                    <div key={i} className={styles.highlights}>
                                        <div className={styles.partHead} style={{ color: '#3F51B5' }} >{data.heading}</div>
                                        <div className={styles.partSubHead}>{data.date}, {data.RepsName}, {data.companyName}</div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className={styles.homeBody1Part3}>
                            <div className={styles.partHeader}>
                                <div className={styles.partHead}>Top Performer</div>
                                <div className={styles.partSubHead}>Congratulations!</div>
                            </div>
                            <div className={styles.img}>
                                <img src={performer} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className={styles.homeBody2}>
                        <div className={styles.homeBody2Part1}>
                            <div className={styles.partHead}>Team Performance</div>
                            <div className={styles.pieChart}>
                                <Pie data={myChart} options={{
                                    maintainAspectRatio:false,
                                    plugins: {
                                        legend: {
                                            display: true,
                                            position: "right"
                                        }
                                    }
                                }} width='255px' height='255px' />
                            </div>
                        </div>
                        <div className={styles.homeBody2Part2}>
                            <div className={styles.homeBodyPerformanceHeader}>
                                <div className={styles.partHead} style={{ fontWeight: '700', fontSize: '16px' }} >Recent Calls</div>
                                <div className={styles.homeBodyHeaderGap}></div>
                                <div className={styles.homeBodyHeader2}>
                                    <div className={styles.partHead} style={{ fontWeight: '400' }}>Recordings</div>
                                </div>
                            </div>
                            <div className={styles.highlights} style={{ gap: '15px', paddingLeft: '10px' }} >
                                <div className={styles.partHead} style={{ color: '#3F51B5', fonstSize: '15px' }}>Today</div>
                                <div className={styles.performanceHeadingData}>
                                    <div className={styles.recentCallsImg}>
                                        <img src={call} alt="" />
                                    </div>
                                    <div className={styles.partHeader}>
                                        <div className={styles.partHead}>ABC Company</div>
                                        <div className={styles.partSubHead}>Date</div>
                                        <div className={styles.partSubHead}>Deal closing date</div>
                                    </div>
                                    <div className={styles.headingDataIcons}>
                                        <img src={msg2} alt="" />
                                        <div className={styles.ImgNumber}>23</div>
                                        <div className={styles.imgDiv}></div>
                                        <img src={[phone]} alt="" />
                                        <div className={styles.ImgNumber}>23</div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.highlights} style={{ gap: '15px', paddingLeft: '10px' }} >
                                <div className={styles.partHead} style={{ color: '#3F51B5', fonstSize: '15px' }}>Yesterday</div>
                                <div className={styles.performanceHeadingData}>
                                    <div className={styles.recentCallsImg}>
                                        <img src={call} alt="" />
                                    </div>
                                    <div className={styles.partHeader}>
                                        <div className={styles.partHead}>ABC Company</div>
                                        <div className={styles.partSubHead}>Date</div>
                                        <div className={styles.partSubHead}>Deal closing date</div>
                                    </div>
                                    <div className={styles.headingDataIcons}>
                                        <img src={msg2} alt="" />
                                        <div className={styles.ImgNumber}>23</div>
                                        <div className={styles.imgDiv}></div>
                                        <img src={[phone]} alt="" />
                                        <div className={styles.ImgNumber}>23</div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.highlights} style={{ gap: '15px', paddingLeft: '10px' }} >
                                <div className={styles.partHead} style={{ color: '#3F51B5', fonstSize: '15px' }}>Tuesday</div>
                                <div className={styles.performanceHeadingData}>
                                    <div className={styles.recentCallsImg}>
                                        <img src={call} alt="" />
                                    </div>
                                    <div className={styles.partHeader}>
                                        <div className={styles.partHead}>ABC Company</div>
                                        <div className={styles.partSubHead}>Date</div>
                                        <div className={styles.partSubHead}>Deal closing date</div>
                                    </div>
                                    <div className={styles.headingDataIcons}>
                                        <img src={msg2} alt="" />
                                        <div className={styles.ImgNumber}>23</div>
                                        <div className={styles.imgDiv}></div>
                                        <img src={[phone]} alt="" />
                                        <div className={styles.ImgNumber}>23</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.homeBody3}>
                        <div className={styles.partHead} style={{ fontSize: '16px', fontWeight: '700' }} >To Do List</div>
                        <div className={styles.homeBody3Part1}>
                            <div className={styles.partHead} style={{ fontSize: '15px', fontWeight: '700' }} >Today</div>
                            <div className={styles.HoverWrapper}>
                                <div className={styles.homeBody3Part1Part} style={{ borderBottom: '1px solid #E5EFFF' }} >
                                    <div className={styles.rectIcon}></div>
                                    <div className={styles.highlights} style={{ borderBottom: '0px' }} >
                                        <div className={styles.partHead} style={{ color: '#3F51B5', fontSize: '16px', fontWeight: '700' }} >Heading</div>
                                        <div className={styles.partSubHead}>July 19, 2022, Reps name, ABC company</div>
                                    </div>
                                </div>
                                <div className={styles.homeBody3Part1Part} style={{ borderBottom: '1px solid #E5EFFF' }} >
                                    <div className={styles.rectIcon}></div>
                                    <div className={styles.highlights} style={{ borderBottom: '0px' }} >
                                        <div className={styles.partHead} style={{ color: '#3F51B5', fontSize: '16px', fontWeight: '700' }} >Heading</div>
                                        <div className={styles.partSubHead}>July 19, 2022, Reps name, ABC company</div>
                                    </div>
                                </div>
                                <div className={styles.homeBody3Part1Part} style={{ borderBottom: '1px solid #E5EFFF' }} >
                                    <div className={styles.rectIcon}></div>
                                    <div className={styles.highlights} style={{ borderBottom: '0px' }} >
                                        <div className={styles.partHead} style={{ color: '#3F51B5', fontSize: '16px', fontWeight: '700' }} >Heading</div>
                                        <div className={styles.partSubHead}>July 19, 2022, Reps name, ABC company</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.homeBody3Part1}>
                            <div className={styles.partHead} style={{ fontSize: '15px', fontWeight: '700' }} >Yesterday</div>
                            <div className={styles.HoverWrapper}>
                                <div className={styles.homeBody3Part1Part} style={{ borderBottom: '1px solid #E5EFFF' }} >
                                    <div className={styles.rectIcon}></div>
                                    <div className={styles.highlights} style={{ borderBottom: '0px' }} >
                                        <div className={styles.partHead} style={{ color: '#3F51B5', fontSize: '16px', fontWeight: '700' }} >Heading</div>
                                        <div className={styles.partSubHead}>July 19, 2022, Reps name, ABC company</div>
                                    </div>
                                </div>
                                <div className={styles.homeBody3Part1Part} style={{ borderBottom: '1px solid #E5EFFF' }} >
                                    <div className={styles.rectIcon}></div>
                                    <div className={styles.highlights} style={{ borderBottom: '0px' }} >
                                        <div className={styles.partHead} style={{ color: '#3F51B5', fontSize: '16px', fontWeight: '700' }} >Heading</div>
                                        <div className={styles.partSubHead}>July 19, 2022, Reps name, ABC company</div>
                                    </div>
                                </div>
                                <div className={styles.homeBody3Part1Part} style={{ borderBottom: '1px solid #E5EFFF' }} >
                                    <div className={styles.rectIcon}></div>
                                    <div className={styles.highlights} style={{ borderBottom: '0px' }} >
                                        <div className={styles.partHead} style={{ color: '#3F51B5', fontSize: '16px', fontWeight: '700' }} >Heading</div>
                                        <div className={styles.partSubHead}>July 19, 2022, Reps name, ABC company</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.homeBody3Part1}>
                            <div className={styles.partHead} style={{ fontSize: '15px', fontWeight: '700' }} >Tuesday</div>
                            <div className={styles.HoverWrapper}>
                                <div className={styles.homeBody3Part1Part} style={{ borderBottom: '1px solid #E5EFFF' }} >
                                    <div className={styles.rectIcon}></div>
                                    <div className={styles.highlights} style={{ borderBottom: '0px' }} >
                                        <div className={styles.partHead} style={{ color: '#3F51B5', fontSize: '16px', fontWeight: '700' }} >Heading</div>
                                        <div className={styles.partSubHead}>July 19, 2022, Reps name, ABC company</div>
                                    </div>
                                </div>
                                <div className={styles.homeBody3Part1Part} style={{ borderBottom: '1px solid #E5EFFF' }} >
                                    <div className={styles.rectIcon}></div>
                                    <div className={styles.highlights} style={{ borderBottom: '0px' }} >
                                        <div className={styles.partHead} style={{ color: '#3F51B5', fontSize: '16px', fontWeight: '700' }} >Heading</div>
                                        <div className={styles.partSubHead}>July 19, 2022, Reps name, ABC company</div>
                                    </div>
                                </div>
                                <div className={styles.homeBody3Part1Part} style={{ borderBottom: '1px solid #E5EFFF' }} >
                                    <div className={styles.rectIcon}></div>
                                    <div className={styles.highlights} style={{ borderBottom: '0px' }} >
                                        <div className={styles.partHead} style={{ color: '#3F51B5', fontSize: '16px', fontWeight: '700' }} >Heading</div>
                                        <div className={styles.partSubHead}>July 19, 2022, Reps name, ABC company</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home


