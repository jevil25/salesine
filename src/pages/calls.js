import All from '../components/All'
import Calling from '../components/Calling'
import Navbar from '../components/Navbar'
import Contacts from '../components/Contact'
import {useRouter} from 'next/router'
import { useEffect } from 'react'


const Calls = ({ authUrl }) => {
  const router = useRouter();
  if(typeof window !== 'undefined') {
    if(localStorage.getItem('token') === null) {
        router.push('/login');
    }
  }
  
  useEffect(()=>{
    const recordings = getRecordings();
  },[])

  async function getRecordings(){
  let recordings = await fetch("api/recordings").then((res)=>res.json())
  console.log(recordings)
  return recordings;
  }

  return (
    <>
      <Navbar type = 'calls' />
      <div style={{display: 'flex', width: '100%'}}>
          <Contacts />
          <All recordings={{recordings}} url={authUrl}/>
          <Calling />
      </div>
    </>
  )
}



export default Calls