import styles from '../styles/All.module.css'
import { Video } from 'tabler-icons-react';
import { useState, useEffect } from 'react'
import axios from 'axios'
import {useRouter} from "next/router";
import ReactPlayer from 'react-player';
import { useRef } from 'react';
import { 
   Card,
   Group, 
   Text, 
   Badge, 
   Paper,
   Modal, 
   useMantineTheme,
   Button, 
   Skeleton,
   TextInput,
   Input
} from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';


const All = (props) => {
  const [calls, setCalls] = useState([]);
  const player = useRef();
  const [url, setUrl] = useState('');
  const [btn, setBtn] = useState(false);
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);

  const router = useRouter();
  let obj = []
  const {
    query: { code },
  } = router

  const [selected, setSelected] = useState({
    date: true,
    duration: false,
  })

 
  const [syncCalls, setSyncCalls] = useState([]);

  const initiateMeeting = () => {
    const data = axios.post('api/zoom', {
      name: name,
      startTime: startTime,
      duration: duration,
      repeat: repeat,
      email: localStorage.getItem('email'),
      })
      .then((response) => {
        setUrl(response.data.join_url)
        setBtn(true)
      })
      .catch((err) => {
        console.log(err);
      })
    }

    const formatDate = (date) => {
      const res = date.split('T')
      return res[0]
    }
  

  useEffect(() => {

    const sync = () => {
      //  axios.post('api/calendar',{code: code})
      //  .then((response) => {
      //     console.log(response)
      //     setSyncCalls(response.data)
      //     console.log(syncCalls)
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   })
    }

    const populateCalls = () => {
      axios.post('api/calls',{email: localStorage.getItem('email')})
      .then((response) => {
        console.log(response)
        setCalls(response.data)
        console.log(calls)
      })
      .catch((err) => {
        console.log(err);
      })
    }

    populateCalls();
    
  }, [])
  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState('');
  const [repeat, setRepeat] = useState('');

  const joinHandler = () => {
    window.location.href = url
  }


  return (
    <div className={styles.allContainer}>
      <div className={styles.allContainerHeading}>
        <p>All Calls</p>
      </div>
      <div class={styles.initiateButton}>
          <Button onClick={open} color="indigo">Initiate New Meeting</Button>
        </div>
      <div className={styles.allSortBy}>
        <div className={styles.allSortBy1}>Sort By</div>
        <div className={selected.date ? styles.allSort2Selected : styles.allSortBy2} style={{ cursor: 'pointer' }} onClick={() => setSelected({
          date: true,
          duration: false,
        })}>
          <div className={styles.allsortLine}></div>
          <div className={styles.allSortDate} style={{paddingLeft:'20px'}}>Date</div>
        </div>
        <div className={selected.duration ? styles.allSort3Selected : styles.allSortBy3} style={{ cursor: 'pointer' }} onClick={() => setSelected({
          date: false,
          duration: true,
        })}>
          <div className={styles.allsortLine}></div>
          <div className={styles.allSortDuration} style={{paddingLeft:'15px'}}>Call Duration</div>
        </div>
        <div styles={{marginLeft: '10px'}}>  
          
        </div>
      </div>
      
      <div className={styles.allCalls}>


      {
        calls.length > 0 ?
              calls.map((item, index) =>{
                return (

                <div className={styles.allCall} key={index}>
                  <div > <Video size={35} /> </div>
                  <div className={styles.allInfo}>
                    <div className={styles.allHeading}>{item.topic}</div>
                    <div className={styles.allSubInfo}>{item.start_time}</div>
                    <div className={styles.allSubInfo}>{formatDate(item.date)}</div>
                  </div>
                  <Badge color="indigo">
                    <Text size="sm" weight={500}>
                      Completed
                    </Text>
                  </Badge>
              
                     <Button color="indigo" onClick={() => {
                      localStorage.setItem('recording', JSON.stringify(item))
                      router.push('/recordings')}
                     }> Recording </Button>
              
                </div>
          )
        })
       : <>
       <Skeleton height={50} circle mb="xl" />
       <Skeleton height={8} radius="xl" />
       <Skeleton height={8} mt={6} radius="xl" />
       <Skeleton height={8} mt={6} width="70%" radius="xl" />
       <br/>
       <Skeleton height={50} circle mb="xl" />
       <Skeleton height={8} radius="xl" />
       <Skeleton height={8} mt={6} radius="xl" />
       <Skeleton height={8} mt={6} width="70%" radius="xl" />
       <br/>
       <Skeleton height={50} circle mb="xl" />
       <Skeleton height={8} radius="xl" />
       <Skeleton height={8} mt={6} radius="xl" />
       <Skeleton height={8} mt={6} width="70%" radius="xl" />
       <br/>
       <Skeleton height={50} circle mb="xl" />
       <Skeleton height={8} radius="xl" />
       <Skeleton height={8} mt={6} radius="xl" />
       <Skeleton height={8} mt={6} width="70%" radius="xl" />
       <br/>
     
     </>
      }

      </div>
    </div>
  )
}

export default All