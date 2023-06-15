import All from '../components/All'
import Calling from '../components/Calling'
import Navbar from '../components/Navbar'
import Contacts from '../components/Contact'
// import Meeting from '../components/Meeting'
import {useRouter} from 'next/router'
import Link from 'next/link'

const Calls = ({ authUrl }) => {
  const router = useRouter();
  // if(typeof window !== 'undefined') {
  //   if(localStorage.getItem('token') === null) {
  //       router.push('/login');
  //   }
  // }
  return (
    <>
      <Navbar type = 'calls' />
      <div style={{display: 'flex', width: '100%'}}>
          <Contacts />
          <Link href="/Zoommeet"><button style={{margin:"5vw"}}>Join meet</button></Link>
          <Link href="/Zoommeetstart"><button style={{margin:"5vw"}}>Start meet</button></Link>
          <Calling />
      </div>
    </>
  )
}



export default Calls