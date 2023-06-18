import styles from '../styles/Navbar.module.css'
import logo2 from '../../public/assets/logo2.png'
import Link from 'next/link'
import { useState,useEffect } from 'react';
const Navbar = (props) => {
    const [toggleMenu, setToggleMenu] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if(localStorage.getItem('token') !== null) {
            setLoggedIn(true);
            }
        }
    }, [typeof window]);

    return (
        <div className={styles.navbarContainer}>
            <div className={styles.navLogo}>
                <img src={logo2} alt="logo" width={120} />
            </div>
            <ul className={styles.navLinks}>
                <li><Link href="/" className={props.type === 'home' ? styles.active : null} >HOME</Link></li>
                <li><Link href="/calls" className={props.type === 'calls' ? styles.active : null}>CALLS</Link></li>
                <li><Link href="/recordings" className={props.type === 'recording' ? styles.active : null}>RECORDING</Link></li>
                <li><Link href="/deals" className={props.type === 'deals' ? styles.active : null}>DEALS</Link></li>
                <li><Link href="/team" className={props.type === 'teams' ? styles.active : null}>TEAM</Link></li>
                <li><Link href="/activity" className={props.type === 'activity' ? styles.active : null}>ACTIVITY</Link></li>
                <li><Link href="/library" className={props.type === 'library' ? styles.active : null}>LIBRARY</Link></li>
            </ul>
            <div className={styles.navSearch}>
                <input type="text" placeholder='Search' className={styles.navInput} />
                <img src="https://img.icons8.com/ios-filled/24/ffffff/search--v1.png" alt="search" />
            </div>
            <div className={styles.navLinks}>
                {loggedIn ? <li><Link href="/account">MY ACCOUNT</Link></li> : <li><Link href="/login" className="">Login</Link></li>}
            </div>
            <div className={styles.navSmallScreen}>
                <img src="https://img.icons8.com/ios-glyphs/30/ffffff/menu--v1.png" alt="" onClick={() => setToggleMenu(true)} />
                {toggleMenu && (
                    <div className={styles.navSmall}>
                        <img src="https://img.icons8.com/ios-glyphs/30/ffffff/macos-close.png" alt="" onClick={()=> setToggleMenu(false)} />
                        <ul className={styles.navlinks}>
                            <li><Link href="/" className={props.type === 'home' ? styles.active : null} >HOME</Link></li>
                            <li><Link href="/recordings" className={props.type === 'recording' ? styles.active : null}>RECORDING</Link></li>
                            <li><Link href="/calls" className={props.type === 'calls' ? styles.active : null}>CALLS</Link></li>
                            <li><Link href="/deals" className={props.type === 'deals' ? styles.active : null}>DEALS</Link></li>
                            <li><Link href="/team" className={props.type === 'teams' ? styles.active : null}>TEAM</Link></li>
                            <li><Link href="/activity" className={props.type === 'activity' ? styles.active : null}>ACTIVITY</Link></li>
                            <li><Link href="/library" className={props.type === 'library' ? styles.active : null}>LIBRARY</Link></li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar;