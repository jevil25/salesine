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
  return (
    <>
      <Navbar type = 'calls' />
      <div style={{display: 'flex', width: '100%'}}>
          <Contacts />
          <All url={authUrl}/>
          <Calling />
      </div>
    </>
  )
}



export default Calls