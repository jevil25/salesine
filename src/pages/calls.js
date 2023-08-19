import All from '../components/All'
import Calling from '../components/Calling'
import Navbar from '../components/Navbar'
import {useRouter} from 'next/router'
import styles from '../styles/Calls.module.css'
import { useState } from 'react'


const Calls = ({ authUrl }) => {
  const router = useRouter();
  if(typeof window !== 'undefined') {
    if(localStorage.getItem('token') === null) {
        router.push('/login');
    }
  }

  const [name,setName] = useState('');
  const [trackers,setTrackers] = useState("");

  return (
    <>
      <Navbar type = 'calls' />
      <div className={styles.calls}>
          {/* <Contacts /> */}
          <All url={authUrl} meetName={name} trackers={trackers}/>
          <Calling name={setName} trackers={setTrackers}/>
      </div>
    </>
  )
}



export default Calls