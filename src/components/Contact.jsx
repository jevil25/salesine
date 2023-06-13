import styles from '../styles/Contact.module.css'
import isaac from '../../public/assets/Isaac.png'
import { useState } from 'react';
const Contacts = () => {

    const [open, setOpen] = useState(false);
    const [sort, setsort] = useState("Sort By")

    return (
        <div className={styles.contactsContainer}>
            <div className={styles.contactsContainerHeading}>
                <p>Contacts</p>
            </div>
            <div className={styles.contactFilters}>
                <div className={styles.findContact}>
                    <div className={styles.findInput}>
                        <input type="text" placeholder='Find contact' />
                    </div>
                    <div className={styles.findIcon}>
                        <img src="https://img.icons8.com/ios-filled/16/000000/search--v1.png" alt="" />
                    </div>
                </div>
                <div className={styles.sortby}>
                    <div className={styles.sortContact}>
                        <div>{sort}</div>
                    </div>
                    {open &&
                        <div className={styles.openSort}>
                            <div className={styles.sorting} onClick={() => { setsort('Name'); setOpen(!open) }} >Name</div>
                            <div className={styles.divi}></div>
                            <div className={styles.sorting} onClick={() => { setsort('Type'); setOpen(!open) }} >Type</div>
                            <div className={styles.divi}></div>
                            <div className={styles.sorting} onClick={() => { setsort('Time'); setOpen(!open) }} >Time</div>
                        </div>
                    }
                    <div className={styles.sortIcon} onClick={() => setOpen(!open)}>
                        <img src="https://img.icons8.com/ios-glyphs/14/000000/sort-down.png" alt="" />
                    </div>
                </div>
            </div>
            <div className={styles.contactWrapper}>
                <div className={styles.contactHistory}>
                    <div className={styles.contactImage}>
                        <img src={isaac} alt="" />
                    </div>
                    <div className={styles.contactDesc}>
                        <div className={styles.contactName}>ABC</div>
                        <div className={styles.contactTime}>a minute ago</div>
                    </div>
                </div>
                <div className={styles.contactHistory}>
                    <div className={styles.contactImage}>
                        <img src={isaac} alt="" />
                    </div>
                    <div className={styles.contactDesc}>
                        <div className={styles.contactName}>ABC</div>
                        <div className={styles.contactTime}>a minute ago</div>
                    </div>
                </div>
                <div className={styles.contactHistory}>
                    <div className={styles.contactImage}>
                        <img src={isaac} alt="" />
                    </div>
                    <div className={styles.contactDesc}>
                        <div className={styles.contactName}>ABC</div>
                        <div className={styles.contactTime}>a minute ago</div>
                    </div>
                </div>
                <div className={styles.contactHistory}>
                    <div className={styles.contactImage}>
                        <img src={isaac} alt="" />
                    </div>
                    <div className={styles.contactDesc}>
                        <div className={styles.contactName}>ABC</div>
                        <div className={styles.contactTime}>a minute ago</div>
                    </div>
                </div>
                <div className={styles.contactHistory}>
                    <div className={styles.contactImage}>
                        <img src={isaac} alt="" />
                    </div>
                    <div className={styles.contactDesc}>
                        <div className={styles.contactName}>ABC</div>
                        <div className={styles.contactTime}>a minute ago</div>
                    </div>
                </div>
                <div className={styles.contactHistory}>
                    <div className={styles.contactImage}>
                        <img src={isaac} alt="" />
                    </div>
                    <div className={styles.contactDesc}>
                        <div className={styles.contactName}>ABC</div>
                        <div className={styles.contactTime}>a minute ago</div>
                    </div>
                </div>
                <div className={styles.contactHistory}>
                    <div className={styles.contactImage}>
                        <img src={isaac} alt="" />
                    </div>
                    <div className={styles.contactDesc}>
                        <div className={styles.contactName}>ABC</div>
                        <div className={styles.contactTime}>a minute ago</div>
                    </div>
                </div>
                <div className={styles.contactHistory}>
                    <div className={styles.contactImage}>
                        <img src={isaac} alt="" />
                    </div>
                    <div className={styles.contactDesc}>
                        <div className={styles.contactName}>ABC</div>
                        <div className={styles.contactTime}>a minute ago</div>
                    </div>
                </div>
                <div className={styles.contactHistory}>
                    <div className={styles.contactImage}>
                        <img src={isaac} alt="" />
                    </div>
                    <div className={styles.contactDesc}>
                        <div className={styles.contactName}>ABC</div>
                        <div className={styles.contactTime}>a minute ago</div>
                    </div>
                </div>
                <div className={styles.contactHistory}>
                    <div className={styles.contactImage}>
                        <img src={isaac} alt="" />
                    </div>
                    <div className={styles.contactDesc}>
                        <div className={styles.contactName}>ABC</div>
                        <div className={styles.contactTime}>a minute ago</div>
                    </div>
                </div>
                <div className={styles.contactHistory}>
                    <div className={styles.contactImage}>
                        <img src={isaac} alt="" />
                    </div>
                    <div className={styles.contactDesc}>
                        <div className={styles.contactName}>ABC</div>
                        <div className={styles.contactTime}>a minute ago</div>
                    </div>
                </div>
                <div className={styles.contactHistory}>
                    <div className={styles.contactImage}>
                        <img src={isaac} alt="" />
                    </div>
                    <div className={styles.contactDesc}>
                        <div className={styles.contactName}>ABC</div>
                        <div className={styles.contactTime}>a minute ago</div>
                    </div>
                </div>
                <div className={styles.contactHistory}>
                    <div className={styles.contactImage}>
                        <img src={isaac} alt="" />
                    </div>
                    <div className={styles.contactDesc}>
                        <div className={styles.contactName}>ABC</div>
                        <div className={styles.contactTime}>a minute ago</div>
                    </div>
                </div>
                <div className={styles.contactHistory}>
                    <div className={styles.contactImage}>
                        <img src={isaac} alt="" />
                    </div>
                    <div className={styles.contactDesc}>
                        <div className={styles.contactName}>ABC</div>
                        <div className={styles.contactTime}>a minute ago</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contacts