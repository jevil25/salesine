import React from 'react'
import Navbar from '../components/Navbar'
import styles from '../styles/Index.module.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Table, Checkbox, Button, MultiSelect, Group, Modal, Input } from '@mantine/core';
import { isWindowDefined } from 'swr/_internal'
import AddMember from '../components/AddMember'
import EditMember from '../components/EditMember'

const Admin = () => {
  const [org, setOrg] = useState([]);
  const [emails, setEmails] = useState([]);
  const [check, setCheck] = useState(false);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([]);
  const [width, setWidth] = useState(1000);
  const [emailId, setEmailId] = useState('');
  const [orgName, setOrgName] = useState('');
  const [orgEmail, setOrgEmail] = useState('');
  const [orgRole, setOrgRole] = useState('');
  const [addTrackerModal, setAddTrackerModal] = useState(false);


  const BACK_END_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000" ;
  useEffect(() => {
     const populateOrg = () => {
          fetch(`${BACK_END_URL}/admin/getusers`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: localStorage.getItem('email') })
          })
          .then(res => res.json())
          .then(data => {
              //check if data.status is present
              console.log(data)
              if (data.status === false) {
                console.log(data.message)
                setOrg([])
              }
              setOrg(data)
              setEmails(data.map((element) => element.email))
              console.log(org)
          }) 
      }
     populateOrg();
  }, [check])

  useEffect(() => {
    if(window!==undefined) {
      setWidth(window.innerWidth)
    }
    //check if user is superadmin
    fetch(`${BACK_END_URL}/admin/checkadmin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: localStorage.getItem('email') })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.status === false) {
          router.push('/')
        }
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        setEmailId(email)

        fetch(`${BACK_END_URL}/validate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ token, email }),
                })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (data.status === 200) {
                        console.log("success")
                    }
                    if(data.status === 401){
                        localStorage.removeItem('token');
                        localStorage.removeItem('email');
                        router.push('/login');
                    }
                })
                .catch((err) => {
                    console.log(err);
                }
            );
      })
  },[isWindowDefined])

  const ths = (
    <tr>
      <th></th>
      <th>Name of Team Member</th>
      <th>Email ID</th>
      <th>Number of Total Deals</th>
      <th>Number of Closed Deals</th>
      <th>Number of Active Deals</th>
      <th>Role</th>
    </tr>
  );

  const rows = org.length !== 0 ? org.map((element) => (
    <tr key={element.email}>
      <td>
        <Checkbox
          value={element.email}
          onChange={(event) => {
            const isChecked = event.currentTarget.checked;
            const checkboxValue = event.currentTarget.value;
            setSelected((prevSelected) => {
              if (isChecked) {
                // Add the value to the selected array if it's checked
                return [...prevSelected, checkboxValue];
              } else {
                // Remove the value from the selected array if it's unchecked
                return prevSelected.filter((value) => value !== checkboxValue);
              }
            });
          }}
        />
      </td>
      <td>{element.name}</td>
      <td>{element.email}</td>
      <td>{element.activeDeals + element.closedDeals}</td>
      <td>{element.activeDeals}</td>
      <td>{element.closedDeals}</td>
      <td>{element.role}</td>
    </tr>
  )) : "No members in the organization";
   
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
      fetch(`${BACK_END_URL}/admin/deleteuser`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: selected })
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        window.location.reload();
      })
    }

   useEffect(() => {
    org.map((element) => {
      if(element.email === searchValue) {
        setOrgName(element.name)
        setOrgEmail(element.email)
        setOrgRole(element.role)
      }
    })
    }, [searchValue])

    
    useEffect(() => {
      fetch(`${BACK_END_URL}/admin/getTracker`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: localStorage.getItem('email') })
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.status === false) {
          console.log(data.message)
          return;
        }
        setTrackers(data.tracker.trackers)
      })
    }, [])

    const [trackers, setTrackers] = useState([]);
    const [trackerName, setTrackerName] = useState('');
    const [trackersLimit, setTrackersLimit] = useState(false);
    const [trackersSent, setTrackersSent] = useState([]);
    const addTrackerToList = () => {
      //check length is 10
      if(trackers.length === 10) {
        setTrackersLimit(true)
        return;
      }
      setTrackers([...trackers, trackerName])
      console.log(trackers)
      setTrackerName('')
    }
    const addTracker = () => {
      fetch(`${BACK_END_URL}/admin/addtracker`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: localStorage.getItem('email'), trackerName: trackersSent })
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setTrackersSent([])
        setAddTrackerModal(false)
        location.reload();
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
                        data={emails.map((email) => ({ label: email, value: email }))}
                        style={{width: '400px'}}
                        placeholder="Seach user by Email ID of the Organization to edit their details"
                        searchable
                        onChange={(e) => setSearchValue(e[0])}
                        searchValue={searchValue}
                        onSearchChange={setSearchValue}
                        nothingFound="Nothing found"
                        maxSelectedValues={1}
                      />
                    <EditMember
                      name={orgName}
                      email={orgEmail}
                      role={orgRole}
                      searchValue={searchValue}
                    />
                  </Group>
                  <br/>
                  {selected.length > 0 ? <Button variant='outline' onClick={removeMembers}>
                    Remove below Selected Members
                  </Button> : <Button variant='outline' onClick={removeMembers} disabled>
                    Remove below Selected Members
                  </Button>}
                  <AddMember 
                    adminEmail={emailId}
                  />
                  <Button variant='outline' onClick={() => setAddTrackerModal(true)}>
                    Add Trackers
                  </Button>
                  <Table striped verticalSpacing="lg">
                    <thead>{ths}</thead>
                    <tbody>{rows}</tbody>
                  </Table>
                </div>
            </div>
            {
              addTrackerModal && (
                <Modal opened={addTrackerModal} onClose={() => setAddTrackerModal(false)} title="Add Trackers" size="md">
                  <Input placeholder='Enter Tracker Name' value={trackerName} onChange={e => setTrackerName(e.target.value)} style={{marginBottom:"20px"}} />
                  {trackersLimit && <div style={{color:"red"}}>You can add only 10 trackers</div>}
                  <Button onClick={() => addTrackerToList()} style={{marginRight:"20px"}}>Add</Button>
                  {trackers.map((tracker) => (
                      <div style={{display:"flex",flexDirection:"row",gap:"10px",margin:"10px 0px 10px 0px"}}>
                        <Checkbox
                          value={tracker}
                          onChange={(event) => {
                            const isChecked = event.currentTarget.checked;
                            const checkboxValue = event.currentTarget.value;
                            setTrackersSent((prevSelected) => {
                              if (isChecked) {
                                // Add the value to the selected array if it's checked
                                return [...prevSelected, checkboxValue];
                              } else {
                                // Remove the value from the selected array if it's unchecked
                                return prevSelected.filter((value) => value !== checkboxValue);
                              }
                            });
                          }
                        }
                        />
                        {tracker}
                      </div>
                    ))}
                    <Button onClick={() => addTracker()}>
                      Done
                    </Button>
                </Modal>
              )
            }
        </>
    )
}

export default Admin


