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
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

export default function advance_register(){
    const BACK_END_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000" ;
    const [oldpassword,setoldpass] = useState("");
    const [newpassword,setnewpass] = useState("");
    const [email,setEmail] = useState("")
    useEffect(()=>{
        const email = localStorage.getItem("email")
        setEmail(email)
    },[])

    async function changepassword(){
        await fetch(`${BACK_END_URL}/changepassword`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email,oldpassword,newpassword
            })
        }).then((res)=>res.json()).then((data)=>console.log(data))
    }

    return (
        <>
        <Container size={800} my={80} >
         <Title
              align="center"
              sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
            >
              Change Password
            </Title>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
              {/* {invalid && <Text color="red" align="center">Invalid credentials</Text>} */}
              {/* {serverError && <Text color="red" align="center">Server error</Text>} */}
              <TextInput 
                label="Old Password" 
                name="email" 
                value={oldpassword}
                onChange={(e) => setoldpass(e.target.value)} 
                placeholder="Old Password" 
                size="md"
                required 
              />
              <PasswordInput 
                label="New Password" 
                value={newpassword}
                name="password" 
                onChange={(e) => setnewpass(e.target.value)} 
                placeholder="New password" 
                size="md"
                required mt="md" 
              />
              <br />
              {/* <Checkbox
                label="Keep me logged in"
                name="keep-logged-in"
                // onChange={(e) => setRemember(e.target.checked)}
              /> */}
              <Group position="apart" mt="lg">
      
                {/* <Anchor component="button" size="sm">
                  Forgot password?
                </Anchor> */}
              </Group>
              <Button fullWidth mt="xl" size="md"
               onClick={changepassword} 
               color="indigo">
                Change Password
              </Button>
            </Paper>

        </Container>

        <Container size={800} my={80} >
         <Title
              align="center"
              sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
            >
              Voice Registration
            </Title>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
              {/* {invalid && <Text color="red" align="center">Invalid credentials</Text>} */}
              {/* {serverError && <Text color="red" align="center">Server error</Text>} */}
              {/* <TextInput 
                label="Old Password" 
                name="email" 
                // value={email}
                // onChange={(e) => setEmail(e.target.value)} 
                placeholder="Old Password" 
                size="md"
                required 
              /> */}
              Press the start button and repeat the sentence into your microphone
              
              <br />
              <div style={{backgroundColor:"wheat",marginTop:"20px",padding:"10px"}}>
              I enjoy listening to music in my free time.What is the weather like today?
              </div>
            
              <Group position="apart" mt="lg">
      
                {/* <Anchor component="button" size="sm">
                  Forgot password?
                </Anchor> */}
              </Group>
              <Button fullWidth mt="xl" size="md"
            //    onClick={loginHandler} 
               color="indigo">
                Start
              </Button>
            </Paper>

        </Container>
        </>
    )
}