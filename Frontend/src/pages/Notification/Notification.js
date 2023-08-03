import React from "react"
import styles from "./Notification.module.css";
import Topbar from "../../component/Topbar";
import { Link } from "react-router-dom";

export default function Notification() {
    return (
        document.body.style.backgroundColor = "white",
        <div className={styles.page}>
            <Topbar />
            <div className={styles.notification}>
                <div className={styles.user}>
                    <img src="profile.jpg" alt="" className={styles.profilepic} />
                    <h4 className={styles.username}>THOR : GOD OF THUNDER</h4>
                    <span className={styles.bio}> Hi I am Thor, The God of Thunder from Asgard (About) </span>
                    <button className={styles.follow}> Follow + </button>
                    <Link to='/profile' className={styles.view}>View full profile</Link>
                </div>
                <div className={styles.notify}>
                    Post and Comment will be shown Here
                </div>
            </div>
        </div>
    )
}