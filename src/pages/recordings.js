import { Divider, Card, Button, Group, Badge } from '@mantine/core';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Recordings(props) {
  const router = useRouter()
  if (typeof window !== 'undefined') {
    if(localStorage.getItem('token') === null) {
      router.push('/login');
    }
  }
  const [btn, setBtn] = useState('Transcript');
  const toggleHandler = () => {
    if (btn === 'Recording') {
      setBtn('Transcript');
    } else {
      setBtn('Recording');
    } 
  }

  const {
    query: { topic, id, video, trans, rec },
  } = router
  console.log(rec)
  const set = "/Recordings/" + video
  return (
    <>
      <div style={{margin: '20px'}}>
        <h1>Recording for {topic}</h1>
          <h2>ID : {id} </h2>
        <Divider />
        <br/>
        <div style={{display: 'flex',  alignItems: 'center'}}>
          { btn === 'Transcript' ?
            <video width='55%' height='40%' controls>
                <source src={set} type="video/mp4" />
            </video> : 
            <Card shadow="sm" padding="xs"  radius="md"   withBorder style={{height: '400px', cursor: 'pointer', width: '60%' }}>
              <h2 style={{textAlign: 'center'}}>Transcript</h2>
              <h3>{trans}</h3>
            </Card>
          }
          <Card shadow="sm" padding="xs"  radius="md"   withBorder style={{height: '400px', cursor: 'pointer', marginLeft: '30px', width: '30%' }}>
            <h2 style={{textAlign: 'center'}}>Chat Window</h2>
            
          </Card>
        </div>
        <br/>
        <Group>
          <Button size="md" onClick={() => router.push('/')}>
            Go Back
          </Button>
          <Button size="md" variant="outline" onClick={toggleHandler}>
            Toggle {btn}
          </Button>
        </Group>
        
      </div>
    </>
  );
}