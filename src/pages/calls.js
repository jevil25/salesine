import All from '../components/All'
import Calling from '../components/Calling'
import Navbar from '../components/Navbar'
import Contacts from '../components/Contact'
import {useRouter} from 'next/router'


const Calls = ({ authUrl }) => {
  const router = useRouter();
  if(typeof window !== 'undefined') {
    if(localStorage.getItem('token') === null) {
        router.push('/login');
    }
  }
  
  async function getRecordings(){
  const messages = await fetch("api/recordings").then((res)=>res.json())
  console.log(messages)
  }
  getRecordings();

  return (
    <>
      <Navbar type = 'calls' />
      <div style={{display: 'flex', width: '100%'}}>
          <Contacts />
          <All messages={messages} length={messages.length} url={authUrl}/>
          <Calling />
      </div>
    </>
  )
}



export default Calls