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

export default function AuthenticationTitle({ url, authUrl }) {
  const router = useRouter()
  const {
    query: { code },
  } = router
  const [active, setActive] = useState(0);
  const [load, setLoad] = useState(false)
  const nextStep = () => {
    window.location.href = `https://salesine.vercel.app/api/zoomAuth`
  }
  const prevStep = () => setActive((current) => (current > 0 && localStorage.getItem('token') == undefined  ? current - 1 : current));
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [company_name, setCompany_name] = useState('')
  const [company_email, setCompany_email] = useState('')
  const [company_details, setCompany_details] = useState('')
  const [invalid, setInvalid] = useState(false)
  const [msg, setMsg] = useState('')
  
  const BACK_END_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000" ;
  const registerHandler = async () => {
    setLoad(true)
    fetch(`${BACK_END_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, name,company_name,company_email,company_details })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        if(data.message === "User registered successfully")
        {
          localStorage.setItem("email", email);
          setActive(1)
          setLoad(false)
        }else{
          setInvalid(true)
          setMsg(data.message)
        }
    }).catch(err => {
      console.log(err)
      setLoad(false)
    }
    )
  }
  const pushHome = () => {
    fetch(`${BACK_END_URL}/googleAuth`, {
      method:'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(res => res.json())
    .then(data => {
      router.push(data.url)
    })
  }
  setTimeout(() => {
    if(code != undefined){
      localStorage.setItem('code', code)
      setActive(2)
    }
  }, 1000)
  return (
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
            <Title
              align="center"
              sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 600, fontSize: 12,color: 'red' })}
            >
              Note: Only company Admins must signup
            </Title>
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
              <TextInput 
                  label="Username" 
                  name="username" 
                  value={name}
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="username" 
                  size="md"
                  required 
              />
              <br />
              <TextInput 
                label="Email" 
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
              <TextInput
                label="Company Name"
                name="companyName"
                placeholder="Company Name"
                size="md"
                required
                value={company_name}
                onChange={(e) => setCompany_name(e.target.value)}
              />
              <TextInput
                label="Company Email"
                name="companyEmail"
                placeholder="Company Email"
                size="md"
                required
                value={company_email}
                onChange={(e) => setCompany_email(e.target.value)}
              />
              <TextInput
                label="Company Details"
                name="companyDetails"
                placeholder="Company Details"
                size="md"
                required
                value={company_details}
                onChange={(e) => setCompany_details(e.target.value)}
              />
              <Group position="apart" mt="lg">
      
               
              </Group>
              {invalid && <Text color="red">{msg}</Text>}
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
        {/* <Stepper.Step label="Second step" description="Grant Zoom">
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
             <Title align="center" sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 700 })}>
               Grant Access to Zoom Meetings
             </Title>
             <br />
             <img src="../../assets/Zoom.jpeg" height="100px" width="100px" style={{marginLeft: '43%'}}/>
             <br /><br /> 
             <Button fullWidth mt="xl" size="md" onClick={nextStep} color="indigo">
               Proceed
             </Button>
          </Paper>
        </Stepper.Step> */}
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
  );
}


