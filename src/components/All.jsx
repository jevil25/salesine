
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
  const [calls, setCalls] = useState([
    
  ]);
  const player = useRef();
  const [url, setUrl] = useState('');
  const [btn, setBtn] = useState(false);
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);
//   if(typeof window !== 'undefined') {
//     if(localStorage.getItem('calls').length > 0) {
//         setCalls(JSON.parse(localStorage.getItem('calls')))
//     }
// }
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
  

  useEffect(() => {

    const sync = () => {
       axios.post('api/calendar',{code: code})
       .then((response) => {
          console.log(response)
          setSyncCalls(response.data)
          console.log(syncCalls)
        })
        .catch((err) => {
          console.log(err);
        })
    }

    const populateCalls = () => {
      const data = axios.post('api/meetings', {email: localStorage.getItem('email')})
        .then((response) => {
          setCalls(response.data.recordings)
          console.log(calls)
        })
        .catch((err) => {
          console.log(err);
        })
      }

    // if (code) {
    //   console.log("got code")
    //   sync()
    // }
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
      <Modal 
      opened={opened} 
      onClose={close} 
      
      overlayProps={{
        color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
        opacity: 0.55,
        blur: 3,
      }}
      centered>
        <h1>
          Initiate Meeting
        </h1>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <Input
                  onChange={(e) => {
                    console.log(e.target.value)
                    setName(e.target.value)}}
              
                  label="Meeting Name"
                  placeholder="Meeting Name"
                  size="md"
                />
                <br/>
                <Input
                  onChange={(e) => setStartTime(e.target.value)}
                
                  placeholder="Start Time (in 24 hour format)"
                  max={24}
                  min={0}
                  size="md"
                />
            
              <br/>
            
                <Input  
                  onChange={(e) => setDuration(e.target.value)}
                
                  placeholder="Duration (in minutes)"
                  max={60}
                  min={30}
                  size="md"
                />
                <br/>
                <Input component="select" size="md" onChange={(e) => setRepeat(e.target.value)}>
                    <option value="1">Daily</option>
                    <option value="2">Weekly</option>
                    <option value="3">Monthly</option>
                  </Input>
                
          
              <br/>
          
          <Group >
              <Button size="lg" onClick={initiateMeeting}>
                Initiate
              </Button>
              
                {
                  btn == true ?
                    <Button size="lg" onClick={joinHandler} variant="outline">
                      Join Meeting
                    </Button>
                  : null
                }
            
          </Group> 
            </Paper>
      </Modal>
      <div className={styles.allContainerHeading}>
        <p>All Calls</p>
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
        <div>
          <Button onClick={open} color="indigo">Initiate Meeting</Button>
        </div>
      </div>
      
      <div className={styles.allCalls}>


      {
        calls.length > 0 ?
              calls.map((item, index) =>  {
                return (

                <div className={styles.allCall} key={index}>
                  <div > <Video size={35} /> </div>
                  <div className={styles.allInfo}>
                    <div className={styles.allHeading}>{item.topic}</div>
                    <div className={styles.allSubInfo}>{item.start_time}</div>
                  </div>
                  <Badge color="indigo">
                    <Text size="sm" weight={500}>
                      Completed
                    </Text>
                  </Badge>
              
                     <Button color="indigo" onClick={() => {
                      localStorage.setItem('recording', JSON.stringify(item))
                      router.push('/recording')}
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