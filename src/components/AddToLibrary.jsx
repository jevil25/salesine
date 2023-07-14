import { Input,Select, Modal,Text, LoadingOverlay } from "@mantine/core";
import { useState } from "react";
import { Button } from "@mantine/core";
import plus from '../../public/assets/plus.png';
import Image from 'next/image';
import styles from "../styles/AddToLibrary.module.css";
import { useEffect } from "react";

const AddToLibrary = ({ fileId }) => {
    const [modal, setModal] = useState(false);
    const [addFolder, setAddFolder] = useState(false);
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [loading, setLoading] = useState(false);
    const [unsuccessful, setUnsuccessful] = useState(false);
    const [folderId, setFolderId] = useState("");
    const [folder, setFolder] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/library`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                },
            body: JSON.stringify({
                email: localStorage.getItem("email"),
                })
            })
            .then((res) => res.json())
            .then((data) => {
                setLoading(false);
                setFolder(data.folder)
                setRefresh(false);
            });
    }, [refresh]);

    const addFile = (folderId) => {
        setModal(false);
        setLoading(true);
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/library/addfile`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: localStorage.getItem("email"),
                folderId: folderId,
                fileId: fileId,
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setLoading(false);
            if(data.status){
                console.log("success");
                setRefresh(true);
            }
            else
                setUnsuccessful(true);
        });
    }

    const createFolderModal = () => {
        setModal(false);
        setAddFolder(true);
    }

    const createFolder = () => {
        setAddFolder(false);
        setLoading(true);
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/library/addfolder`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: localStorage.getItem("email"),
                name: name,
                type: type,
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setLoading(false);
            if(data.status){
                console.log("success");
                setFolderId(data.folder.id)
                addFile(data.folder.id);
            }
            else
                setUnsuccessful(true);
        });
    }

    const values = folder.map((item) => {
        return { value: item.id, label: item.name };
        })

    return (
        <>
            <LoadingOverlay visible={loading} />
            <div onClick={e => setModal(true)}>Add to Library</div>
            <Image onClick={e => setModal(true)} src={plus} alt="Add to library" />
            {modal &&
                <Modal size={"lg"} title={"Add to Library"} opened={modal} onClose={e => setModal(false)}>
                    <div className={styles.modal}>
                        <div className={styles.title}>
                            <Text className={styles.label}>Choose a Folder</Text>
                            <Select
                                data={values}
                                placeholder="Select a folder"
                                className={styles.select}
                                onChange={(event) => setFolderId(event)}
                            />
                            <Button className={styles.label} onClick={e => addFile(folderId)}>Add</Button>
                        </div>
                        <div className={styles.title}>
                            <Text className={styles.label}>OR</Text>
                        </div>
                        <div className={styles.title}>
                            <Button className={styles.label} onClick={e => createFolderModal()}>Create a new Folder</Button>
                        </div>
                    </div>
                </Modal>
            }
            {
                addFolder &&
                <Modal size={"lg"} title={"Create a new Folder"} opened={addFolder} onClose={e => setAddFolder(false)}>
                    <div className={styles.modal}>
                        <div className={styles.title}>
                            <Text className={styles.label}>Folder Name</Text>
                            <Input className={styles.input} type="text" onChange={e => setName(e.target.value)} />
                        </div>
                        <div className={styles.title}>
                            <Text className={styles.label}>Type</Text>
                            <Select
                                data={[
                                    { value: "PUBLIC", label: "PUBLIC" },
                                    { value: "PRIVATE", label: "PRIVATE" },
                                ]}
                                placeholder="Select type"
                                className={styles.select}
                                onChange={(event) => setType(event)}
                            />
                        </div>
                        <div className={styles.title}>
                            <Button className={styles.label} onClick={e => createFolder()}>Create</Button>
                            <Button className={styles.label} onClick={e => setAddFolder(false)}>Cancel</Button>
                        </div>
                    </div>
                </Modal>
            }
        </>
    );
};

export default AddToLibrary;