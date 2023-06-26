import { Modal, Select } from "@mantine/core";
import { useState } from "react";
import { Button } from "@mantine/core";
import styles from "../styles/Modal.module.css";

const AddMember = (adminEmail) => {
    const BACK_END_URL = process.env.BACKEND_URL || "http://localhost:4000" ;
    const [isOpened, setIsOpened] = useState(false);
    const [name1, setName] = useState("");
    const [email1, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("USER");

    const submit = () => {
        console.log("Submit")
        setIsOpened(false);
        fetch(`${BACK_END_URL}/admin/adduser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name1,
                email: email1,
                password: password,
                role: role,
                admin_email: adminEmail,
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
    return (
        <>
            <Button variant='filled' onClick={e => setIsOpened(true)} className={styles.addCompany}>
                Add Member
            </Button>
            {isOpened &&
                <Modal opened={isOpened} title="Create Company" onClose={e => setIsOpened(false)} className={styles.modal}>
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
                />
                <label htmlFor="Password">Password</label>
                <input
                type="text"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                />
                <label htmlFor="Role">Role</label>
                <Select
                placeholder="Select role"
                data={[
                    { value: "USER", label: "USER" },
                    { value: "ADMIN", label: "ADMIN" },
                ]}
                value={role}
                onChange={(event) => setRole(event)}
                />
                <Button onClick={e => setIsOpened(false)}>Cancel</Button>
                <Button onClick={e => submit()}>Create</Button>
            </form>
                </Modal>
            }
        </>
    )
}

export default AddMember