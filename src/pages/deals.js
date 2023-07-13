import React from 'react'
import { useEffect,useState } from 'react'
import styles from "../styles/deals.module.css"
import Navbar from '../components/Navbar'
import activity from '../../public/assets/activity.png'
import sample from '../../public/assets/sample.png'
import { Line } from 'react-chartjs-2'
import { faker } from '@faker-js/faker'
import moment from 'moment/moment'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
  } from 'chart.js';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
  );

const labels = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

export const options = {
    maintainAscpectRatio:false,
    hover: {
        mode: 'dataset',
        intersect: false
      },
    scales: {
        y: {
            display:false,
          },
        x: {
            display:false,
        }
      },
    responsive: true,
    plugins: {
        legend: {
            display:false
        },
        title: {
            display: false
        },
    },
};

const data = [
    {
        img: sample, name: 'ABC Company', activity: {
            data: {
                labels,
                datasets: [{
                    fill: true,
                    data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                    backgroundColor: '#E5EFFF',
                    hoverBackgroundColor:'#3F51B5',
                }],
            }
        }, nextCall: 'Today', amount: '$20,000', status: 'Validation', closeDate: 'Aug 25, 2022', owner: 'Alex'
    },
    {
        img: sample, name: 'ABC Company', activity: {
            data: {
                labels,
                datasets: [{
                    fill: true,
                    data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                    backgroundColor: '#E5EFFF',
                    hoverBackgroundColor:'#3F51B5',
                }],
            }
        }, nextCall: 'Today', amount: '$20,000', status: 'Validation', closeDate: 'Aug 25, 2022', owner: 'Alex'
    },
    {
        img: sample, name: 'ABC Company', activity: {
            data: {
                labels,
                datasets: [{
                    fill: true,
                    data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                    backgroundColor: '#E5EFFF',
                    hoverBackgroundColor:'#3F51B5',
                }],
            }
        }, nextCall: 'Today', amount: '$20,000', status: 'Validation', closeDate: 'Aug 25, 2022', owner: 'Alex'
    },
    {
        img: sample, name: 'ABC Company', activity: {
            data: {
                labels,
                datasets: [{
                    fill: true,
                    data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                    backgroundColor: '#E5EFFF',
                    hoverBackgroundColor:'#3F51B5',
                }],
            }
        }, nextCall: 'Today', amount: '$20,000', status: 'Validation', closeDate: 'Aug 25, 2022', owner: 'Alex'
    },
    {
        img: sample, name: 'ABC Company', activity: {
            data: {
                labels,
                datasets: [{
                    fill: true,
                    data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                    backgroundColor: '#E5EFFF',
                    hoverBackgroundColor:'#3F51B5',
                }],
            }
        }, nextCall: 'Today', amount: '$20,000', status: 'Validation', closeDate: 'Aug 25, 2022', owner: 'Alex'
    },
    {
        img: sample, name: 'ABC Company', activity: {
            data: {
                labels,
                datasets: [{
                    fill: true,
                    data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                    backgroundColor: '#E5EFFF',
                    hoverBackgroundColor:'#3F51B5',
                }],
            }
        }, nextCall: 'Today', amount: '$20,000', status: 'Validation', closeDate: 'Aug 25, 2022', owner: 'Alex'
    },
    {
        img: sample, name: 'ABC Company', activity: {
            data: {
                labels,
                datasets: [{
                    fill: true,
                    data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                    backgroundColor: '#E5EFFF',
                    hoverBackgroundColor:'#3F51B5',
                }],
            }
        }, nextCall: 'Today', amount: '$20,000', status: 'Validation', closeDate: 'Aug 25, 2022', owner: 'Alex'
    },
    {
        img: sample, name: 'ABC Company', activity: {
            data: {
                labels,
                datasets: [{
                    fill: true,
                    data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                    backgroundColor: '#E5EFFF',
                    hoverBackgroundColor:'#3F51B5',
                }],
            }
        }, nextCall: 'Today', amount: '$20,000', status: 'Validation', closeDate: 'Aug 25, 2022', owner: 'Alex'
    },
]

const Deals = () => {
    const [crmData,setcrmData] = useState([]) 
    const [email, setEmail] = useState("");
    const BACK_END_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";
    useEffect(()=>{
      async function getopp(){
        const email = localStorage.getItem("email");
        setEmail(email);
        const data = await fetch(`${BACK_END_URL}/crm`,{
          method:'POST',
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            email,
            flag:"listopp"
          })
        }).then((res)=>res.json());
        console.log(data)
        if(data.message == "Integrate your CRM"){
          console.log("yooo")
        }
      }
      getopp()
    },[])


    const formatDate = moment().format('LL');
    return (
      <div className={styles.dealsApp}>
        <Navbar type="deals" />
        <div className={styles.dealsWrapper}>
          <div className={styles.dealsWrapperComponent1}>
            <div className={styles.dealsWrapperComponent1stats}>
              <div className={styles.statsName}>Total Deals</div>
              <div className={styles.statsCount}>75</div>
            </div>
            <div className={styles.dealsWrapperComponent1stats}>
              <div className={styles.statsName}>Closed Deals</div>
              <div className={styles.statsCount}>50</div>
            </div>
            <div className={styles.dealsWrapperComponent1stats}>
              <div className={styles.statsName}>Active Deals</div>
              <div className={styles.statsCount}>25</div>
            </div>
          </div>
          <div className={styles.dealsWrapperComponent2}>
            <div className={styles.dealsWrapperComonent2Filter}>
              <div className={styles.dealsWrapperComonent2Filter1}>
                <div className={styles.filter1name}>
                  Points of Interest
                </div>
              </div>
              <div className={styles.dealsWrapperComonent2Filter1}>
                <div className={styles.filter1name}>
                  Interaction Stats
                </div>
              </div>
              <div className={styles.dealsWrapperComonent2Filter1}>
                <div className={styles.filter1name}>
                  Company
                </div>
              </div>
              <div className={styles.date}>{formatDate}</div>
            </div>
            <div className={styles.dealsWrapperComonent2Parameter}>
              <div className={styles.parameter} style={{ flex: 2 }}>
                <div className={styles.parameterName}>Name(Client)</div>
              </div>
              <div className={styles.parameter} style={{ flex: 4 }}>
                <img src={activity} alt="" />
                <div className={styles.parameterName}>Activity</div>
              </div>
              <div className={styles.parameter} style={{ flex: 1 }}>
                <div className={styles.parameterName}>Next Call</div>
              </div>
              <div className={styles.parameter} style={{ flex: 1 }}>
                <div className={styles.parameterName}>Amount</div>
              </div>
              <div className={styles.parameter} style={{ flex: 1 }}>
                <div className={styles.parameterName}>Status</div>
              </div>
              <div className={styles.parameter} style={{ flex: 1 }}>
                <div className={styles.parameterName}>Close Date</div>
              </div>
              <div className={styles.parameter} style={{ flex: 1 }}>
                <div className={styles.parameterName}>Owner</div>
              </div>
              <div className={styles.parameter} style={{ flex: 2 }}>
                <div className={styles.parameterName}>Send to Team</div>
              </div>
            </div>
            <div className={styles.dealsWrapperComonent2Details}>
              {data.map((val) => (
                <div className={styles.dataWrapper}>
                  <div className={styles.nameData} style={{ flex: 2, justifyContent: 'space-evenly' }}>
                    <img src={val.img} alt="" />
                    <div className={styles.Dataname}>{val.name}</div>
                  </div>
                  <div className={styles.nameData} style={{ flex: 4 }}>
                    <div className={styles.areaChart}>
                      <Line data={val.activity.data} options={options} height='40px' />
                    </div>
                  </div>
                  <div className={styles.nameData} style={{ flex: 1 }}>
                    <div className={styles.Dataname}>{val.nextCall}</div>
                  </div>
                  <div className={styles.nameData} style={{ flex: 1 }}>
                    <div className={styles.Dataname}>{val.amount}</div>
                  </div>
                  <div className={styles.nameData} style={{ flex: 1 }}>
                    <div className={styles.Dataname}>{val.status}</div>
                  </div>
                  <div className={styles.nameData} style={{ flex: 1 }}>
                    <div className={styles.Dataname}>{val.closeDate}</div>
                  </div>
                  <div className={styles.nameData} style={{ flex: 1 }}>
                    <div className={styles.Dataname}>{val.owner}</div>
                  </div>
                  <div className={styles.nameData} style={{ flex: 2 }}>
                    <div className={styles.buttonWrapper}>
                      <div className={styles.sendButton}>
                        <div className={styles.sendButtonName}>Send to</div>
                        <img src="https://img.icons8.com/material-sharp/14/000000/sort-down.png" alt="" style={{ cursor: 'pointer' }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

export default Deals