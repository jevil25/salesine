import React from 'react'
import Navbar from '../components/Navbar'
import styles from '../styles/Index.module.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Table, Checkbox, Button, MultiSelect, Group } from '@mantine/core';

const Admin = () => {
  const [org, setOrg] = useState([]);
  const [emails, setEmails] = useState([]);
  const [check, setCheck] = useState(false);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([]);
  const BACK_END_URL = "http://localhost:4000";
  useEffect(() => {
     const populateOrg = () => {
          fetch(`${BACK_END_URL}/api/admin`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: localStorage.getItem('email'), flag: 'getOrg' })
          })
          .then(res => res.json())
          .then(data => {
            
              setOrg(data.organization)
              setEmails(data.emails)
              setData(data.emails.map((email) => ({ label: email, value: email })))
              console.log(data.emails)
          }) 
      }
     populateOrg();
  }, [check])

  const ths = (
    <tr>
      <th></th>
      <th>Name of Team Member</th>
      <th>Email ID</th>
      <th>Number of Total Deals</th>
      <th>Number of Closed Deals</th>
      <th>Number of Active Deals</th>
    </tr>
  );

  const rows = org !== undefined ? org.map((element) => (
    <tr key={element.email}>
      <td>
        <Checkbox
          value={element.email}
          onChange={(event) => {  
            setSelected([...selected, event.currentTarget.value]);
    
          }}
        />
      </td>
      <td>{element.username}</td>
      <td>{element.email}</td>
      <td>{element.sales.total}</td>
      <td>{element.sales.active}</td>
      <td>{element.sales.closed}</td>
    </tr>
  )) : "You are not authorized to interact with this page ";
   
    const router = useRouter();
    const { 
        query: { code } 
    } = router;
    if(typeof window !== 'undefined') {
        if(localStorage.getItem('token') === null) {
            router.push('/login');
        }
    }
    const [searchValue, setSearchValue] = useState('');
    const addMember = () => {
      console.log(searchValue)
      console.log(data)
      fetch(`${BACK_END_URL}/api/admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: localStorage.getItem('email'), userEmail: searchValue, flag: 'updateOrg' })
      })
      .then(res => res.json())
      .then(data => {
      
          window.location.reload();

      })
    }
    const removeMembers = () => {
      console.log(selected)
      fetch(`${BACK_END_URL}/api/admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: localStorage.getItem('email'), userEmail: selected, flag: 'removeOrg' })
      })
      .then(res => res.json())
      .then(data => {
      
        window.location.reload();
      })
    }
    return (
        <>
            <Navbar/>
            <div className={styles.homeWrapper}>
                <div className={styles.homeHeader}>
                    <div className={styles.homeHeaderHeading}>Admin Portal for Organization</div>
                </div>
                

                <div style={{marginLeft: '10%', marginRight: '10%'}}>
                  <Group>
                      <MultiSelect
                        data={data}
                        style={{width: '400px'}}
                        placeholder="Seach user by Email ID of the Organization"
                        searchable
                        onChange={(e) => setSearchValue(e[0])}
                        searchValue={searchValue}
                        onSearchChange={setSearchValue}
                        nothingFound="Nothing found"
                        maxSelectedValues={1}
                      />
                    <Button onClick={addMember}>
                      Add Member
                    </Button>
                  </Group>
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


