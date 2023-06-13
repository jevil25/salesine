import All from '../components/All'
import Calling from '../components/Calling'
import Navbar from '../components/Navbar'
import Contacts from '../components/Contact'
// import Meeting from '../components/Meeting'
import {useRouter} from 'next/router'
import Link from 'next/link'
import { useState,useEffect } from 'react';

const Calls = ({ authUrl }) => {
  const router = useRouter();
  const [recordings, setRecordings] = useState([]);

  useEffect(() => {
    const getRecordings = async () => {
    let record_data = localStorage.getItem("accessToken");
    //if (record_data) {
      let videoInfo = fetch("https://salestine.onrender.com/api/getRecordings", {
        method: "POST",
        body: JSON.stringify({ access_token : record_data }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res)=>{
        console.log(res.json())
      })
    //}
  }
    getRecordings();

      //render the record_data,just write the state
      // setRecordings();
  },[]);
  // if(typeof window !== 'undefined') {
  //   if(localStorage.getItem('token') === null) {
  //       router.push('/login');
  //   }
  // }
  // console.log(recordings)
  return (
    <>
      <Navbar type="calls" />
      <div style={{ display: "flex", width: "100%" }}>
        <Contacts />
        <div>
          <Link href="/Zoommeet">
            <button style={{ margin: "5vw" }}>Join meet</button>
          </Link>
          <Link href="/Zoommeetstart">
            <button style={{ margin: "5vw" }}>Start meet</button>
          </Link>
          <div id="recordings">{recordings}</div>
        </div>

        <Calling />
      </div>
    </>
  );
}



export default Calls