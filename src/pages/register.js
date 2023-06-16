import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Stepper,
  Group,
  Loader
} from '@mantine/core';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import Navbar from '../components/Navbar';


export default function AuthenticationTitle({ url, authUrl }) {
  const [already, setAlready] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const router = useRouter()
  const code = router.query.code;
  const operation = router.query.operation;
  const backEndURl = 'https://salestine.onrender.com';

  useEffect(() => {
    setActive(0)
    if(!router.isReady) return;
    const code = router.query.code;
    const newemail = router.query.email;
    const google = router.query.type;
    if(code !== undefined && code !== null){
      // console.log(code);
      if (code) {
        //give call to /api/accessToken
        fetch(`${backEndURl}/api/accessToken`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ code:code,operation:"signup",email:newemail })
        })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          localStorage.removeItem("accessToken")
          localStorage.removeItem("refreshToken")
          localStorage.removeItem("expiresIn")
          localStorage.setItem("accessToken",data.access_token)
          localStorage.setItem("refreshToken",data.refresh_token)
          localStorage.setItem("expiresIn",data.expiryTime)
        })
      }
    }
    console.log(email)
    if(code===undefined && email!==undefined && email!==null){
      console.log(email)
      setActive(0)
    }
    console.log(google)
    if(google==="google"){
      setActive(2)
    }
  }, [router.isReady])

  const [active, setActive] = useState(0);
  const [load, setLoad] = useState(false)
  const nextStep = () => {
    console.log('next')
    fetch(`${backEndURl}/api/zoomLogin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        },
      body: JSON.stringify({ operation:"register",email:email }),
      })
      .then(res => res.json())
      .then(data => {
        router.push(data)
      }
    )
  }
  // const prevStep = () => setActive((current) => (current > 0 && localStorage.getItem('token') == undefined  ? current - 1 : current));
  const registerHandler = async () => {
    setLoad(true)
    localStorage.setItem('email', email)
    fetch(`${backEndURl}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, name })
    })
    .then(res => res.json())
    .then(data => {
        if(data.message === 'Email already registered')
          setAlready(true)
        else
          setActive(1)
          setLoad(false)
          setEmail(data.email)
    })  
  }
  const pushHome = () => {
    fetch(`${backEndURl}/api/googleCalender`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      router.push(data.url)
    }
    )
  }
  setTimeout(() => {
    if(operation != undefined){
      localStorage.setItem('code', code)
    }
  }, 1000)
  return (<>    
  <Navbar />
    <Container size={800} my={80} >
       <Stepper active={active} onStepClick={setActive} breakpoint="sm" allowNextStepsSelect={false}>
        <Stepper.Step label="First step" description="Create an account">
              <Title
              align="center"
              sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
            >
              Salesine | Create Account!
            </Title>
            <Text color="dimmed" size="sm" align="center" mt={5}>
               Already have an account ?{' '}
              <Anchor size="sm" component="button">
                <Link href='/login'>
                  Login
                </Link>
                
              </Anchor>
            </Text>

            <Text color="red" size="lg" align="center" mt={5}>
                {
                  already ? 'Email already registered' : ''
                }
            </Text>
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
              <TextInput 
                  label="Name" 
                  name="Name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="username" 
                  size="md"
                  required 
              />
              <br />
              <TextInput 
                label="Zoom Email" 
                name="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="you@mantine.dev" 
                size="md"
                required 
              />
              <PasswordInput 
                label="Password" 
                value={password}
                name="password" 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Your password" 
                size="md"
                required mt="md" 
              />
             
              
              <Group position="apart" mt="lg">
      
               
              </Group>
              <Button fullWidth mt="xl" size="md" onClick={registerHandler} color="indigo">
             
                   {
                      !load ?
                    <Text>
                      Sign up
                    </Text> :
                    <Loader color="dark"/>
                   }
               
              </Button>
            </Paper>
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Grant Zoom">
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
             <Title align="center" sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 700 })}>
               Grant Access to Zoom
             </Title>
             <br />
             <img src="../../assets/Zoom.jpeg" height="100px" width="100px" style={{marginLeft: '43%'}}/>
             <br /><br />
             <Button fullWidth mt="xl" size="md" onClick={nextStep} color="indigo">
               Proceed
             </Button>
          </Paper>
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Grant Google Calendar">
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
             <Title align="center" sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 700 })}>
               Grant Access to Google Calendar
             </Title>
             <br />
             <img src="../../assets/googleCalendar.png" height="100px" width="100px" style={{marginLeft: '43%'}}/>
             <br /><br /> 
             <Button fullWidth mt="xl" size="md" onClick={pushHome} color="indigo">
               Proceed
             </Button>
          </Paper>
        </Stepper.Step>
        <Stepper.Completed>
          
        </Stepper.Completed>
      </Stepper>
    </Container>
    </>
  );
}


