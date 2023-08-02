import All from '../components/All'
import Calling from '../components/Calling'
import Navbar from '../components/Navbar'
import {useRouter} from 'next/router'
import styles from '../styles/Calls.module.css'


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
      <div className={styles.calls}>
          {/* <Contacts /> */}
          <All url={authUrl}/>
          <Calling />
      </div>
    </>
  )
}



export default Calls