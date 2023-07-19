import styles from "../styles/Navbar.module.css";
import logo2 from "../../public/assets/logo2.png";
import Link from "next/link";
import { Button, Input } from "@mantine/core";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import SearchBar from "./SearchBar";

const Navbar = (props) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [text, setText] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("token") !== null) {
        setLoggedIn(true);
      }
      setRole(localStorage.getItem("role"));
      console.log(role);
    }
  }, [typeof window]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    router.push("/login");
  };

  return (
    <div
      className={styles.navbarContainer}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        gap: "4rem",
        paddingLeft: "3rem",
        paddingRight: "3rem",
        zIndex: "100",
      }}
    >
      <div className={styles.navLogo}>
        <Image onClick={e => router.push("/")} src={logo2} alt="logo" />
      </div>
      <ul className={styles.navLinks}>
        <li className={styles.links}>
          <Link
            href="/"
            className={props.type === "home" ? styles.active : null}
          >
            HOME
          </Link>
        </li>
        <li className={styles.links}>
          <Link
            href="/calls"
            className={props.type === "calls" ? styles.active : null}
          >
            CALLS
          </Link>
        </li>
        <li className={styles.links}>
          <Link
            href="/deals"
            className={props.type === "deals" ? styles.active : null}
          >
            DEALS
          </Link>
        </li>
        <li className={styles.links}>
          <Link
            href="/team"
            className={props.type === "teams" ? styles.active : null}
          >
            TEAM
          </Link>
        </li>
        <li className={styles.links}>
          <Link
            href="/activity"
            className={props.type === "activity" ? styles.active : null}
          >
            ACTIVITY
          </Link>
        </li>
        {/* <li><Link href="/activity" className={props.type === 'activity' ? styles.active : null}>ACTIVITY</Link></li> */}
        <li className={styles.links}>
          <Link
            href="/library"
            className={props.type === "library" ? styles.active : null}
          >
            LIBRARY
          </Link>
        </li>
        {loggedIn ? (
          <li className={styles.links}>
            <Link
              href="/settings"
              className={props.type === "settings" ? styles.active : null}
            >
              SETTINGS
            </Link>
          </li>
        ) : (
          <></>
        )}
      </ul>
      <SearchBar />
      <div className={styles.navLinks} style={{ marginLeft: "2rem" }}>
        {loggedIn ? (
          <Button onClick={logout} className={styles.button}>
            Logout
          </Button>
        ) : (
          <li>
            <Button onClick={(e) => router.push("/login")} className="">
              LOGIN/REGISTER
            </Button>
          </li>
        )}
      </div>
      {/* <div className={styles.navLinks}>
                {loggedIn ? role==="SUPERADMIN" || role==="ADMIN" ? <><li><Link href={`/${role.toLowerCase()}`} class={styles.dashboard}>DASHBOARD</Link></li> <Button onClick={logout} className={styles.button}>Logout</Button></> : <><li><Link href="/account">MY ACCOUNT</Link></li> <Button onClick={logout} className={styles.button}>Logout</Button></> : <li><Link href="/login" className="">Login</Link></li>}
            </div> */}
      <div className={styles.navSmallScreen}>
        <img
          src="https://img.icons8.com/ios-glyphs/30/ffffff/menu--v1.png"
          alt=""
          onClick={() => setToggleMenu(true)}
        />
        {toggleMenu && (
          <div className={styles.navSmall}>
            <img
              src="https://img.icons8.com/ios-glyphs/30/ffffff/macos-close.png"
              alt=""
              onClick={() => setToggleMenu(false)}
            />
            <ul className={styles.navlinks}>
              <li>
                <Link
                  href="/"
                  className={props.type === "home" ? styles.active : null}
                >
                  HOME
                </Link>
              </li>
              <li>
                <Link
                  href="/calls"
                  className={props.type === "calls" ? styles.active : null}
                >
                  CALLS
                </Link>
              </li>
              <li>
                <Link
                  href="/deals"
                  className={props.type === "deals" ? styles.active : null}
                >
                  DEALS
                </Link>
              </li>
              <li>
                <Link
                  href="/team"
                  className={props.type === "teams" ? styles.active : null}
                >
                  TEAM
                </Link>
              </li>
              <li>
                <Link
                  href="/activity"
                  className={props.type === "activity" ? styles.active : null}
                >
                  ACTIVITY
                </Link>
              </li>
              <li>
                <Link
                  href="/library"
                  className={props.type === "library" ? styles.active : null}
                >
                  LIBRARY
                </Link>
              </li>
              <li>
                <Link
                  href="/settings"
                  className={props.type === "settings" ? styles.active : null}
                >
                  SETTINGS
                </Link>
              </li>
              {/* <div className={styles.navLinks}> */}
              {/* {loggedIn ? role==="SUPERADMIN" ? <li><Link href="/superadmin">DASHBOARD</Link></li> : <li><Link href="/account">MY ACCOUNT</Link></li> : <li><Link href="/login" className="">Login</Link></li>} */}
              {/* </div> */}
              <div className={styles.navLinks}>
                {loggedIn ? (
                  <></>
                ) : (
                  <li>
                    <Link href="/login" className="">
                      Login/Register
                    </Link>
                  </li>
                )}
              </div>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
