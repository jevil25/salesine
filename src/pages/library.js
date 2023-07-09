import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import styles from '../styles/library.module.css';
import shape from '../../public/assets/shape.png';
import folder from '../../public/assets/folder.png';

export const datas = [
  { id: 1, heading: 'About ANC Company', folders: 1, calls: 4, createdBy: 'Eran Hrbek', lastUpdated: 'Dec 18, 2019' },
  { id: 2, heading: 'Department Overviews', folders: 0, calls: 4, createdBy: 'Brandy Hilbrand', lastUpdated: 'Dec 27, 2019' },
  { id: 3, heading: 'Sales Pitch - 3 Pillars', folders: 0, calls: 3, createdBy: 'Eran Hrbek', lastUpdated: 'Dec 18, 2019' },
  { id: 4, heading: 'Ideal Demo Flow', folders: 0, calls: 4, createdBy: 'Eran Hrbek', lastUpdated: 'Oct 27, 2020' },
  { id: 5, heading: 'About ANC Company', folders: 1, calls: 4, createdBy: 'Eran Hrbek', lastUpdated: 'Dec 18, 2019' },
  { id: 6, heading: 'Department Overviews', folders: 0, calls: 4, createdBy: 'Brandy Hilbrand', lastUpdated: 'Dec 27, 2019' },
  { id: 7, heading: 'Sales Pitch - 3 Pillars', folders: 0, calls: 3, createdBy: 'Eran Hrbek', lastUpdated: 'Dec 18, 2019' },
  { id: 8, heading: 'Ideal Demo Flow', folders: 0, calls: 4, createdBy: 'Eran Hrbek', lastUpdated: 'Oct 27, 2020' },
  { id: 9, heading: 'About ANC Company', folders: 1, calls: 4, createdBy: 'Eran Hrbek', lastUpdated: 'Dec 18, 2019' },
  { id: 10, heading: 'Department Overviews', folders: 0, calls: 4, createdBy: 'Brandy Hilbrand', lastUpdated: 'Dec 27, 2019' },
  { id: 11, heading: 'Sales Pitch - 3 Pillars', folders: 0, calls: 3, createdBy: 'Eran Hrbek', lastUpdated: 'Dec 18, 2019' },
  { id: 12, heading: 'Ideal Demo Flow', folders: 0, calls: 4, createdBy: 'Eran Hrbek', lastUpdated: 'Oct 27, 2020' },
];

export const datasp = [
  { id: 1, heading: 'About ANC Company', folders: 1, calls: 4, createdBy: 'Eran Hrbek', lastUpdated: 'Dec 18, 2019' },
  { id: 2, heading: 'Department Overviews', folders: 0, calls: 4, createdBy: 'Brandy Hilbrand', lastUpdated: 'Dec 27, 2019' },
  { id: 3, heading: 'Sales Pitch - 3 Pillars', folders: 0, calls: 3, createdBy: 'Eran Hrbek', lastUpdated: 'Dec 18, 2019' },
  { id: 4, heading: 'Ideal Demo Flow', folders: 0, calls: 4, createdBy: 'Eran Hrbek', lastUpdated: 'Oct 27, 2020' },
  { id: 5, heading: 'About ANC Company', folders: 1, calls: 4, createdBy: 'Eran Hrbek', lastUpdated: 'Dec 18, 2019' },
  { id: 6, heading: 'Department Overviews', folders: 0, calls: 4, createdBy: 'Brandy Hilbrand', lastUpdated: 'Dec 27, 2019' },
  { id: 7, heading: 'Sales Pitch - 3 Pillars', folders: 0, calls: 3, createdBy: 'Eran Hrbek', lastUpdated: 'Dec 18, 2019' },
  { id: 8, heading: 'Ideal Demo Flow', folders: 0, calls: 4, createdBy: 'Eran Hrbek', lastUpdated: 'Oct 27, 2020' },
  { id: 9, heading: 'About ANC Company', folders: 1, calls: 4, createdBy: 'Eran Hrbek', lastUpdated: 'Dec 18, 2019' },
  { id: 10, heading: 'Department Overviews', folders: 0, calls: 4, createdBy: 'Brandy Hilbrand', lastUpdated: 'Dec 27, 2019' },
  // { id: 11, heading: 'Sales Pitch - 3 Pillars', folders: 0, calls: 3, createdBy: 'Eran Hrbek', lastUpdated: 'Dec 18, 2019' },
  // { id: 12, heading: 'Ideal Demo Flow', folders: 0, calls: 4, createdBy: 'Eran Hrbek', lastUpdated: 'Oct 27, 2020' },
];

const Library = () => {
  const [state, setState] = useState({
    isPublic: true,
    isPrivate: false,
    isfav: false,
  });

  const n = 10;

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
              <div style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '10px 0px' }}>
                Add new folder
              </div>
            </div>
            {[...Array(n)].map(() => (
              <div className={styles.foldrs}>
                <div className={styles.outerCircle}>
                  <div className={styles.innerCircle}></div>
                  <div style={{ zIndex: '3' }}>A</div>
                </div>
                <div>
                  <div>ABC Company</div>
                  <div>a minute ago</div>
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
                  {datas.map((data) => (
                    <div className={styles.folders}>
                      <div className={styles.folderLine}></div>
                      <div className={styles.folder}>
                        <img src={folder} alt="" />
                        <div className={styles.folderInsides}>
                          <div className={styles.folderName}>
                            {data.id}. {data.heading}
                          </div>
                          <div className={styles.folderSub}>
                            {data.folders} folder {data.calls} calls
                          </div>
                          <div className={styles.createdBy}>
                            <div className={styles.folderSubs}>Created by</div>
                            <div className={styles.folderSub}>{data.createdBy}</div>
                          </div>
                          <div className={styles.createdBy}>
                            <div className={styles.folderSubs}>Last updated</div>
                            <div className={styles.folderSub}>{data.lastUpdated}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            {state.isPrivate && (
              <>
                <div className={styles.noOfFolders}>{datasp.length} folders</div>
                <div className={styles.AllFolders}>
                  {datasp.map((data) => (
                    <div className={styles.folders}>
                      <div className={styles.folderLine}></div>
                      <div className={styles.folder}>
                        <img src={folder} alt="" />
                        <div className={styles.folderInsides}>
                          <div className={styles.folderName}>
                            {data.id}. {data.heading}
                          </div>
                          <div className={styles.folderSub}>
                            {data.folders} folder {data.calls} calls
                          </div>
                          <div className={styles.createdBy}>
                            <div className={styles.folderSubs}>Created by</div>
                            <div className={styles.folderSub}>{data.createdBy}</div>
                          </div>
                          <div className={styles.createdBy}>
                            <div className={styles.folderSubs}>Last updated</div>
                            <div className={styles.folderSub}>{data.lastUpdated}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Library;
