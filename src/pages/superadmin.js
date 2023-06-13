import React from 'react'
import Navbar from '../components/Navbar'
import styles from '../styles/Index.module.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import performer from '../../public/assets/performer.png'
import call from '../../public/assets/call.png'
import msg2 from '../../public/assets/msg2.png'
import phone from '../../public/assets/phone.png'
import { Pie } from 'react-chartjs-2'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { createStyles, rem, Text } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { IconGripVertical } from '@tabler/icons-react';
import { Table, Checkbox, Button, MultiSelect, Group } from '@mantine/core';

const Admin = () => {
  const [org, setOrg] = useState([]);
  const [emails, setEmails] = useState([]);
  const [check, setCheck] = useState(false);
  const [selected, setSelected] = useState([]);
  useEffect(() => {
     const populateOrg = () => {
          fetch('/api/superadmin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: localStorage.getItem('email'), flag: 'getOrg' })
          })
          .then(res => res.json())
          .then(data => {
              console.log(data)
              setOrg(data.organization)
              setEmails(data.emails)
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
          value={element.email}
          onChange={(event) => {
            setSelected([...selected, event.currentTarget.value]);
            console.log(event.currentTarget.value);
          }}
        />
      </td>
      <td>{element.username}</td>
      <td>{element.email}</td>
      <td>{element.organization}</td>
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
      console.log(searchValue)
      fetch('/api/superadmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: localStorage.getItem('email'), userEmail: searchValue, flag: 'updateOrg' })
      })
      .then(res => res.json())
      .then(data => {
          console.log(data)
          window.location.reload()
      })
    }
    const removeMembers = () => {
      console.log(selected)
      fetch('/api/superadmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: localStorage.getItem('email'), userEmail: selected, flag: 'removeOrg' })
      })
      .then(res => res.json())
      .then(data => {
          console.log(data)
          window.location.reload()
      })
    }
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
                    <Button onClick={addMember}>
                      Add organization Head
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


