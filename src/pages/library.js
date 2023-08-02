import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import styles from '../styles/library.module.css';
import shape from '../../public/assets/shape.png';
import folder from '../../public/assets/folder.png';
import { useEffect } from 'react';
import { Modal,Input,Text,Select,Button } from '@mantine/core';
import { useRouter } from 'next/router';
import ReactStars from 'react-stars';

export const datas = [
  { id: 1, heading: 'About ANC Company', folders: 1, calls: 4, createdBy: 'Eran Hrbek', lastUpdated: 'Dec 18, 2019' },
];
const Library = () => {
  const [state, setState] = useState({
    isPublic: true,
    isPrivate: false,
    isfav: false,
  });
  const [datas, setDatas] = useState([]);
  const [datasp, setDatasp] = useState([]);
  const [fav, setFav] = useState([]);
  const [invalid, setInvalid] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalFolder, setModalFolder] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [addFolder, setAddFolder] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const n = 10;

  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem('email');
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/library`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === true) {
          //set data with type PUBLIC to datas
          console.log(data.folder);
          setData(data.folder);
          setDatas(data.folder.filter((item) => item.type === 'PUBLIC'));
          setDatasp(data.folder.filter((item) => item.type === 'PRIVATE'));
          setFav(data.folder.filter((item) => item.favorite === true));
        }else{
          setInvalid(true)
        }
      })
  }, [refresh]);

  const formatDate = (date) => {
    const d = new Date(date);
    const month = d.toLocaleString('default', { month: 'short' });
    const day = d.getDate();
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const openFolder = (id) =>{
    //get folder data from id
    const folder = datas.find((item) => item.id === id);
    setModalFolder(folder)
    setModal(true)
  }

  const openFolderp = (id) =>{
    //get folder data from id
    const folder = datasp.find((item) => item.id === id);
    setModalFolder(folder)
    setModal(true)
  }

  const openFolderf = (id) =>{
    //get folder data from id
    const folder = fav.find((item) => item.id === id);
    setModalFolder(folder)
    setModal(true)
  }

  const [fileDetails, setFileDetails] = useState([]);

  const getFileDetails = async (id) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getFileDetailsById`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileId: id }),
      });
      const data = await response.json();
      if (data.status === true) {
        return data.file;
      } else {
        setInvalid(true);
      }
    } catch (error) {
      console.error(error);
      setInvalid(true);
    }
  };
  
  const fetchFileDetails = async () => {
    const fileIds = modalFolder.fileId;
    const details = await Promise.all(fileIds.map((id) => getFileDetails(id)));
    console.log(details);
    setFileDetails(details);
  };
  
  useEffect(() => {
    if (modal) {
      fetchFileDetails();
    }
  }, [modal]);

  const [name, setName] = useState("");
  const [type, setType] = useState("PUBLIC");

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
            setRefresh(!refresh);
        }
        else
            setInvalid(true);
    });
}

const updateFav = (id) => {
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/library/updateFav`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          id: id,
      }),
  })
  .then((res) => res.json())
  .then((data) => {
      console.log(data);
      if(data.status){
          console.log("success");
          setRefresh(!refresh);
      }
      else
          setInvalid(true);
  });
}

const updateType = (id) => {
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/library/updateType`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          id: id,
      }),
  })
  .then((res) => res.json())
  .then((data) => {
      console.log(data);
      if(data.status){
          console.log("success");
          setModal(false);
          setRefresh(!refresh);
      }
      else
          setInvalid(true);
  });
}
  

  return (
    <>
      <Navbar type="library" />
      <div className={styles.libraryWrapper}>
        <div className={styles.libraryHeader}>
          <div className={styles.libraryHead}>LIBRARY</div>
          <div className={styles.libraryBody}>
            <div className={styles.addNew}>
              <div
                style={{
                  backgroundColor: '#F4F8FF',
                  padding: '0px 20px',
                  width: 'max-content',
                  height: '100%',
                  borderRadius: '20px 0px 0px 20px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <img src="https://img.icons8.com/ios-glyphs/14/3f51b5/plus-math.png" alt="" />
              </div>
              <div className={styles.new} style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '10px 0px', }} onClick={e => setAddFolder(true)}>
                Add new folder
              </div>
            </div>
            {data.map((item) => (
              <div className={styles.foldrs}>
                <div className={styles.outerCircle}>
                  <div className={styles.innerCircle}></div>
                  <div style={{ zIndex: '3' }}>A</div>
                </div>
                <div>
                  <div>{item.Company.name}</div>
                  <div>{item.User.name}</div>
                  <div>{formatDate(item.updatedAt)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.libraryBodyy}>
          <div className={styles.libraryBodyHeader}>
            <div
              className={state.isPublic ? styles.activeHead : styles.libraryHeads}
              onClick={() =>
                setState({
                  isPublic: true,
                  isPrivate: false,
                  isfav: false,
                })
              }
            >
              <div className="">Public Folders</div>
              {state.isPublic && (
                <div className={styles.msgShape}>
                  <img src={shape} alt="" />
                </div>
              )}
            </div>
            <div
              className={state.isPrivate ? styles.activeHead : styles.libraryHeads}
              onClick={() =>
                setState({
                  isPublic: false,
                  isPrivate: true,
                  isfav: false,
                })
              }
            >
              <div>Private Folders</div>
              {state.isPrivate && (
                <div className={styles.msgShape}>
                  <img src={shape} alt="" />
                </div>
              )}
            </div>
            <div
              className={state.isfav ? styles.activeHead : styles.libraryHeads}
              onClick={() =>
                setState({
                  isPublic: false,
                  isPrivate: false,
                  isfav: true,
                })
              }
            >
              <div className="">My Favourites</div>
              {state.isfav && (
                <div className={styles.msgShape}>
                  <img src={shape} alt="" />
                </div>
              )}
            </div>
          </div>
          <div className={styles.libraryBodyFolders}>
            {state.isPublic && (
              <>
                <div className={styles.noOfFolders}>{datas.length} folders</div>
                <div className={styles.AllFolders}>
                  {datas.map((data,i) => (<>
                    <div className={styles.folders} onClick={e => openFolder(data.id)}>
                      <ReactStars
                        count={1}
                        size={24}
                        color2={'#ffd700'} 
                        value={data.favorite ? 1 : 0}
                        onChange={e => updateFav(data.id)}
                      />
                      <div className={styles.folderLine}></div>
                      <div className={styles.folder}>
                        <img src={folder} alt="" />
                        <div className={styles.folderInsides}>
                          <div className={styles.folderName}>
                            {i+1}. {data.name}
                          </div>
                          <div className={styles.folderSub}>
                            {data.fileId.length} calls
                          </div>
                          <div className={styles.createdBy}>
                            <div className={styles.folderSubs}>Created by</div>
                            <div className={styles.folderSub}>{data.User.name}</div>
                          </div>
                          <div className={styles.createdBy}>
                            <div className={styles.folderSubs}>Last updated</div>
                            <div className={styles.folderSub}>{formatDate(data.updatedAt)}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    </>
                  ))}
                </div>
              </>
            )}
            {state.isPrivate && (
              <>
                <div className={styles.noOfFolders}>{datasp.length} folders</div>
                <div className={styles.AllFolders}>
                  {datasp.map((data,i) => (<>
                    <ReactStars
                    count={1}
                    size={24}
                    color2={'#ffd700'} 
                    value={data.favorite ? 1 : 0}
                    onChange={e => updateFav(data.id)}
                    />
                    <div className={styles.folders} onClick={e => openFolderp(data.id)}>
                    <div className={styles.folderLine}></div>
                    <div className={styles.folder}>
                      <img src={folder} alt="" />
                      <div className={styles.folderInsides}>
                        <div className={styles.folderName}>
                          {i+1}. {data.name}
                        </div>
                        <div className={styles.folderSub}>
                          {data.fileId.length} calls
                        </div>
                        <div className={styles.createdBy}>
                          <div className={styles.folderSubs}>Created by</div>
                          <div className={styles.folderSub}>{data.User.name}</div>
                        </div>
                        <div className={styles.createdBy}>
                          <div className={styles.folderSubs}>Last updated</div>
                          <div className={styles.folderSub}>{formatDate(data.updatedAt)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </>
                  ))}
                </div>
              </>
            )}
            {state.isfav && (
              <>
                <div className={styles.noOfFolders}>{fav.length} folders</div>
                <div className={styles.AllFolders}>
                  {fav.map((data,i) => (<>
                    <ReactStars
                    count={1}
                    size={24}
                    color2={'#ffd700'} 
                    value={data.favorite ? 1 : 0}
                    onChange={e => updateFav(data.id)}
                    />
                    <div className={styles.folders} onClick={e => openFolderf(data.id)}>
                    <div className={styles.folderLine}></div>
                    <div className={styles.folder}>
                      <img src={folder} alt="" />
                      <div className={styles.folderInsides}>
                        <div className={styles.folderName}>
                          {i+1}. {data.name}
                        </div>
                        <div className={styles.folderSub}>
                          {data.fileId.length} calls
                        </div>
                        <div className={styles.createdBy}>
                          <div className={styles.folderSubs}>Created by</div>
                          <div className={styles.folderSub}>{data.User.name}</div>
                        </div>
                        <div className={styles.createdBy}>
                          <div className={styles.folderSubs}>Last updated</div>
                          <div className={styles.folderSub}>{formatDate(data.updatedAt)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {
        modal && (
          <Modal onClose={() => setModal(false)} opened={modal} title={`${modalFolder.name}`}>
            {/* display the files */}
            <div className={styles.modalBody}>
              <Button className={styles.modalBodyButton} onClick={e => updateType(modalFolder.id)}>{`Make ${modalFolder.type === "PUBLIC" ? `Private`: `Public`}`}</Button>
              <div className={styles.modalBodyHeader}>
                <div className={styles.modalBodyHead}>File Name</div>
                <div className={styles.modalBodyHead}>Created At</div>
              </div>
              <div className={styles.modalBodyFolders}>
              {fileDetails.map((name, i) => (<>
                <div className={styles.modalFolders} key={i} onClick={() => {
                   localStorage.setItem("recording", JSON.stringify(name.meetingId));
                   router.push("/recording");
                 }} >
                  <div style={{"textAlign":"left"}}>{i + 1}. {name.meeting.topic}</div>
                  <div style={{"textAlign":"right"}}>{formatDate(name.timestamp)}</div>
                </div>
                </>
              ))}
              </div>
            </div>
          </Modal>)
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

export default Library;
