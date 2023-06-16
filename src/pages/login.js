import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core';
import Link from 'next/link';
import { useState,useEffect } from 'react';
import { useRouter } from 'next/router'
import styles from '../styles/Login.module.css'
import isTokenExpired from '../utils/ExpirationChecker';
import Navbar from '../components/Navbar';
import dotenv from 'dotenv'


export default function AuthenticationTitle() {
  const [invalid, setInvalid] = useState(false)
  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 && localStorage.getItem('token') == undefined  ? current - 1 : current));
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false);
  const [redirect, setRedirect] = useState(false);
  dotenv.config({
    path: "../../env"
  })

  const backEndURl = 'https://salestine.onrender.com'
  const frontEndURl = 'https://salestine.vercel.app'


  useEffect(() => {
    setInvalid(false)
    setRedirect(false)
    if(!router.isReady) return;
    const code = router.query.code;
    const value = localStorage.getItem('refreshToken')
    console.log(value)
    if (value!== "undefined" && value!== null) {
      setLoggedIn(true)
      //check if access token has expried
      if(isTokenExpired(localStorage.getItem('expiresIn'))){
        fetch(`${backEndURl}/api/newAccessToken`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ refreshToken:value })
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
          console.log("1")
          router.push('/')
        })
      }else{
        // console.log("not expired")
        console.log("2")
        router.push("/")
      }
    }else if(code !== undefined && code !== null){
      // console.log(code);
      setRedirect(true)
      const email=localStorage.getItem("email")
      localStorage.removeItem("email")
      if (code) {
        //give call to /api/accessToken
        console.log("inside code");
        fetch(`${backEndURl}/api/accessToken`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ code:code })
        })
        .then(res => res.json())
        .then(data => {
          localStorage.removeItem("accessToken")
          localStorage.removeItem("refreshToken")
          localStorage.removeItem("expiresIn")
          localStorage.setItem("accessToken",data.access_token)
          localStorage.setItem("refreshToken",data.refresh_token)
          localStorage.setItem("expiresIn",data.expiryTime)
          console.log("3")
          if(email){
            localStorage.removeItem("email")
            localStorage.setItem("email",email)
            fetch(`${backEndURl}/api/updateDb`,{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ 
                email:email,
                accessToken:data.access_token,
                refreshToken:data.refresh_token,
                expiresIn:data.expiryTime
              })
            }).then(res => (
              console.log(res)
            ))
            router.push(`${frontEndURl}/register?email=${email}&type=google`)
          }
          else
          router.push('/')
        })
      }
    }
  }, [router.isReady])

  const loginHandler = async () => {
    fetch(`${backEndURl}/api/zoomLogin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(res => res.json())
    .then(data => {
      router.push(data)
    })  
  }

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const loginSalestineHandler = async () => {
    fetch(`${backEndURl}/api/salestineLogin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email:email,password:password })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if(data.success){
        localStorage.setItem("accessToken",data.access_token)
        localStorage.setItem("refreshToken",data.refresh_token)
        localStorage.setItem("expiresIn",data.expiryTime)
        //router.push('/')
      }else{
        if(data.error === "Zoom Account")
          loginHandler()
        else
           setInvalid(true)
      }
    })
  }

  return (<>
    <Navbar />
    {redirect ? 
      <>
        <div className={styles.redirect}>
            Please Wait Logging in...
        </div>
      </> 
    : 
      <Container size={800} my={40} >
                <Title
                align="center"
                sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
              >
                Salesine | Welcome back!
              </Title>
              <Text color="dimmed" size="sm" align="center" mt={5}>
                Do not have an account yet?{' '}
                <Anchor size="sm" component="button">
                  <Link href='/register'>
                    Create account
                  </Link>
                  
                </Anchor>
              </Text>

              <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <Text color="red" size="lg" align="center" mt={5}>
                  {
                    invalid ? 'Wrong Credentials' : ''
                  }
                </Text>
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
                <br />
                <Checkbox
                  label="Keep me logged in"
                  name="keep-logged-in"
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <Group position="apart" mt="lg">
        
                  <Anchor component="button" size="sm">
                    Forgot password?
                  </Anchor>
                </Group>
                <Button fullWidth mt="xl" size="md" onClick={loginSalestineHandler} color="indigo">
                  Sign in
                </Button>
                <Button fullWidth mt="xl" size="md" onClick={loginHandler} color="indigo">
                  Login with Zoom
                </Button>
              </Paper>
      </Container>
    }
    </>
  );
}
