import { Modal, Select } from "@mantine/core";
import { useEffect, useState } from "react";
import { Button } from "@mantine/core";
import styles from "../styles/Modal.module.css";

export default function EditMember({ email,name,role,searchValue }) {
    const BACK_END_URL = process.env.BACKEND_URL || "http://localhost:4000" ;
    console.log(email,name,role,searchValue);
    const [isOpened, setIsOpened] = useState(false);
    const [email1, setEmail] = useState(email);
    const [name1, setName] = useState(name);
    const [role1, setRole] = useState(role);
    const [invalid, setInvalid] = useState(false);

    useEffect(() => {
        setEmail(email);
        setName(name);
        setRole(role);
    }, [email,name,role]);

    const submit = () => {
        console.log("Submit")
        setIsOpened(false);
        console.log(name1,email1);
        fetch(`${BACK_END_URL}/admin/edituser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name1,
                email: email1,
                role: role1,
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if (data.id) {
                console.log("success");
                window.location.reload();
            } else {
                console.log("error");
            }
        });
    }

    const checkValue = () => {
        if (searchValue === "" || searchValue !== email) {
            setInvalid(true);
        } else {
            setInvalid(false);
            setIsOpened(true);
        }
    }
    
    return (<>       
    <Button onClick={checkValue}>Edit Selected Member</Button>
    {invalid && (
        <h3 style={{color: "red"}}>Please select a member to edit</h3>
    )}
    {isOpened && (
            <Modal opened={isOpened} onClose={e=> setIsOpened(false)} title="Edit Company" className={styles.modal}>
            <form
                onSubmit={(event) => {
                event.preventDefault();
                }}
            >
                <label htmlFor="name">Name</label>
                <input
                type="text"
                value={name1}
                onChange={(event) => setName(event.target.value)}
                />
                <label htmlFor="email">Email</label>
                <input
                type="text"
                value={email1}
                onChange={(event) => setEmail(event.target.value)}
                disabled
                />
                <label htmlFor="role">Role</label>
                <Select
                    data={[
                        { value: "ADMIN", label: "ADMIN" },
                        { value: "USER", label: "USER" },
                    ]}
                    value={role1}   
                    onChange={(event) => setRole(event)}
                />
                <Button onClick={e => setIsOpened(false)}>Cancel</Button>
                <Button onClick={e => submit()}>Edit</Button>
            </form>
            </Modal>
        )}
        </>
    );
}

