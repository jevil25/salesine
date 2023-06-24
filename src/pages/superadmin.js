import React from 'react'
import Navbar from '../components/Navbar'
import styles from '../styles/Index.module.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Table, Checkbox, Button, MultiSelect, Group } from '@mantine/core';

const Admin = () => {
  const [org, setOrg] = useState([]);
  const [check, setCheck] = useState(false);
  const [selected, setSelected] = useState([]);
  const [emails,setEmails] = useState([]);
  const [modal,setModal] = useState(false);
  const [emailId,setEmailId] = useState('');
  const [name,setName] = useState('');
  
  const BACK_END_URL = "http://localhost:4000";
  useEffect(() => {
     const populateOrg = () => {
          fetch(`${BACK_END_URL}/superadmin/getcompanies`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
            //body: JSON.stringify({ email: localStorage.getItem('email'), flag: 'getOrg' })
          })
          .then(res => res.json())
          .then(data => {
              console.log(data)
              setOrg(data)
              setEmails(data.map((element) => element.email))
          }) 
      }
     populateOrg();
  }, [check])

  const ths = (
    <tr>
      <th></th>
      <th>Head of the Organization</th>
      <th>Email ID</th>
      <th>Name of the Organization</th>
    </tr>
  );

  const rows = org !== undefined ? org.map((element) => (
    <tr key={element.email}>
      <td>
        <Checkbox
          value={element.id}
          onChange={(event) => {
            setSelected([...selected, event.currentTarget.value]);
            // console.log(selected);
            // console.log(event.currentTarget.value);
          }}
        />
      </td>
      <td>{element.users[0].name}</td>
      <td>{element.email}</td>
      <td>{element.name}</td>
    </tr>
  )) : "You are not authorized to interact with this page";
   
    const router = useRouter();
    const { 
        query: { code } 
    } = router;
    if(typeof window !== 'undefined') {
        if(localStorage.getItem('token') === null) {
            router.push('/login');
        }
    }
    const [searchValue, onSearchChange] = useState('');
    const addMember = () => {
      setModal(false)
      console.log(searchValue)
      console.log(emailId)
      console.log(name)
      fetch(`${BACK_END_URL}/superadmin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ company_email: selected,user_email: emailId, name: name })
      })
      .then(res => res.json())
      .then(data => {
          console.log(data)
          window.location.reload()
      })
    }
    const removeMembers = () => {
      console.log(selected)
      fetch(`${BACK_END_URL}/superadmin/deletecompany`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        //get values from selected array
        body: JSON.stringify({ company_email: selected })
      })
      .then(res => res.json())
      .then(data => {
          console.log(data)
          window.location.reload()
      })
    }

    const headModal = (
      <form className={styles.form}>
        <input type="text" placeholder="Enter the email id of the owner" onChange={e=>setEmailId(e.currentTarget.value)} />
        <input type="text" placeholder="Enter the name of the owner" onChange={e => setName(e.currentTarget.value)} />
        <Button onClick={addMember}>Add</Button>
      </form>
    )
    return (
        <>
            <Navbar/>
            <div className={styles.homeWrapper}>
                <div className={styles.homeHeader}>
                    <div className={styles.homeHeaderHeading}>Super Admin Portal for Salesine</div>
                </div>
                <div style={{marginLeft: '10%', marginRight: '10%'}}>
                  <Group>
                      <MultiSelect
                      data={emails.map((email) => ({ label: email, value: email }))}
                      style={{width: '400px'}}
                      placeholder="Seach user by Email ID of the Organization"
                      searchable
                      onChange={(e) => onSearchChange(e[0])}
                      searchValue={searchValue}
                      onSearchChange={onSearchChange}
                      nothingFound="Nothing found"
                      maxSelectedValues={1}
                    />
                    <Button onClick={e => setModal(true)}>
                      Add organization Head
                    </Button>
                  </Group>
                  {
                      modal ? headModal : null
                    }
                  <br/>
                  {selected.length > 0 ? <Button variant='outline' onClick={removeMembers}>
                    Remove below Selected Members
                  </Button> : <Button variant='outline' onClick={removeMembers} disabled>
                    Remove below Selected Members
                  </Button>}
                  <Table striped verticalSpacing="lg">
                    <thead>{ths}</thead>
                    <tbody>{rows}</tbody>
                  </Table>
                </div>
                
            </div>
        </>
    )
}

export default Admin


