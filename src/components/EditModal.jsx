import { Modal } from "@mantine/core";
import { useState } from "react";
import { Button } from "@mantine/core";
import styles from "../styles/Modal.module.css";

export default function EditModal({ id,name,email,total,details }) {
    const BACK_END_URL = process.env.BACKEND_URL || "http://localhost:4000" ;
    console.log(name,email,total,details);
    const [isOpened, setIsOpened] = useState(false);
    const [name1, setName] = useState(name);
    const [email1, setEmail] = useState(email);
    const [total1, setTotal] = useState(total);
    const [details1, setDetails] = useState(details);

    const submit = () => {
        console.log("Submit")
        setIsOpened(false);
        console.log(name1,email1,total1,details1);
        fetch(`${backEndUrl}/superadmin/editcompany`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                company_id: id,
                company_name: name1,
                email: email1,
                totalUsers: total1,
                details: details1,
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
    
    return (<>       
    <Button onClick={e => setIsOpened(true)}>Edit</Button>
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
                />
                <label htmlFor="total">Total</label>
                <input
                type="text"
                value={total1}
                onChange={(event) => setTotal(event.target.value)}
                />
                <label htmlFor="details">Details</label>
                <input
                type="text"
                value={details1}
                onChange={(event) => setDetails(event.target.value)}
                />
                <Button onClick={e => setIsOpened(false)}>Cancel</Button>
                <Button onClick={e => submit()}>Edit</Button>
            </form>
            </Modal>
        )}
        </>
    );
}