import { Modal } from "@mantine/core";
import { useState } from "react";
import { Button } from "@mantine/core";
import styles from "../styles/Modal.module.css";

const AddCompany = () => {
    const backEndUrl = "http://localhost:4000";
    const [isOpened, setIsOpened] = useState(false);
    const [name1, setName] = useState("");
    const [email1, setEmail] = useState("");
    const [total1, setTotal] = useState("");
    const [details1, setDetails] = useState("");
    const [ownerName, setOwnerName] = useState("");
    const [ownerEmail, setOwnerEmail] = useState("");
    const [ownerPassword, setOwnerPassword] = useState("");
    const [adminName, setAdminName] = useState("");
    const [adminEmail, setAdminEmail] = useState("");
    const [adminPassword, setAdminPassword] = useState("");

    const submit = () => {
        console.log("Submit")
        setIsOpened(false);
        console.log(name1,email1,total1,details1);
        fetch(`${backEndUrl}/superadmin/addcompany`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                company_name: name1,
                email: email1,
                totalUsers: total1,
                details: details1,
                owner_name: ownerName,
                owner_email: ownerEmail,
                owner_password: ownerPassword,
                admin_name: adminName,
                admin_email: adminEmail,
                admin_password: adminPassword,
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
                Add Company
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
                <label htmlFor="ownerName">Owner Name</label>
                <input
                type="text"
                value={ownerName}
                onChange={(event) => setOwnerName(event.target.value)}
                />
                <label htmlFor="ownerEmail">Owner Email</label>
                <input
                type="text"
                value={ownerEmail}
                onChange={(event) => setOwnerEmail(event.target.value)}
                />
                <label htmlFor="ownerPassword">Owner Password</label>
                <input
                type="text"
                value={ownerPassword}
                onChange={(event) => setOwnerPassword(event.target.value)}
                />
                <label htmlFor="adminName">Admin Name</label>
                <input
                type="text"
                value={adminName}
                onChange={(event) => setAdminName(event.target.value)}
                />
                <label htmlFor="adminEmail">Admin Email</label>
                <input
                type="text"
                value={adminEmail}
                onChange={(event) => setAdminEmail(event.target.value)}
                />
                <label htmlFor="adminPassword">Admin Password</label>
                <input
                type="text"
                value={adminPassword}
                onChange={(event) => setAdminPassword(event.target.value)}
                />
                <Button onClick={e => setIsOpened(false)}>Cancel</Button>
                <Button onClick={e => submit()}>Create</Button>
            </form>
                </Modal>
            }
        </>
    )
}

export default AddCompany