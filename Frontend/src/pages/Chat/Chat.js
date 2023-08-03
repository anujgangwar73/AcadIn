import React from "react"
import styles from "./Chat.module.css";
import Topbar from "../../component/Topbar";
import Dialog from '@material-ui/core/Dialog';

export default function Chat() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        document.body.style.backgroundColor = "rgb(17, 16, 16)",
        < div className={styles.page} >
            <Topbar />
            <div className={styles.content}>
                <div className={styles.left}>
                    <div className={styles.user}>
                        <img src="profile.jpg" alt="" className={styles.profilepic} />
                        <h3 className={styles.heading}>Chats</h3>
                    </div>
                    <div className={styles.friend}>
                        {/* <span className={styles.nochat}>You don't have any  Conversation ( If no chat )</span> */}
                        <div className={styles.friendlist}>
                            <img src="1.jpg" alt="" className={styles.pic} />
                            <div className={styles.chattab}>
                                <span className={styles.friendname}>Ankit Singh</span>
                                <span className={styles.lastchat}>Hello how are you and are you fine now with this</span>
                            </div>
                        </div>
                        <div className={styles.friendlist}>
                            <img src="2.jpg" alt="" className={styles.pic} />
                            <div className={styles.chattab}>
                                <span className={styles.friendname}>Ankith Reddy</span>
                                <span className={styles.lastchat}>Hey are you okay ? </span>
                            </div>
                        </div>
                        <div className={styles.friendlist}>
                            <img src="blank.jpg" alt="" className={styles.pic} />
                            <div className={styles.chattab}>
                                <span className={styles.friendname}>Ananya</span>
                                <span className={styles.lastchat}>Hi</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.addfriendstochat} onClick={handleClickOpen}>
                        <i class="fa-solid fa-user-plus"></i>
                    </div>
                    <Dialog open={open} onClose={handleClose}>
                        {/* Search Bar + list of current friends and modify this list as per search and print no user found accordingly */}
                        <div className={styles.dialog}>
                            <div className={styles.searchspace}>
                                <div className={styles.search}>
                                    <div className={styles.searchbox}>
                                        <input placeholder="Search friend" className={styles.searchinput}></input>
                                        <div className={styles.searchicon}>
                                            <i className="fa fa-search"></i>
                                        </div>
                                    </div>
                                </div>
                                <hr></hr>
                            </div>
                            <div className={styles.dialoglist}>
                                {/* <span className={styles.nofound}> No User Found </span> */}
                                <div className={styles.friendlists}>
                                    <img src="1.jpg" alt="" className={styles.pic} />
                                    <div className={styles.chattab}>
                                        <span className={styles.friendname}>Ankit Singh</span>
                                    </div>
                                </div>
                                <div className={styles.friendlists}>
                                    <img src="2.jpg" alt="" className={styles.pic} />
                                    <div className={styles.chattab}>
                                        <span className={styles.friendname}>Ankith Reddy</span>
                                    </div>
                                </div>
                                <div className={styles.friendlists}>
                                    <img src="blank.jpg" alt="" className={styles.pic} />
                                    <div className={styles.chattab}>
                                        <span className={styles.friendname}>Ananya</span>
                                    </div>
                                </div>
                                <div className={styles.friendlists}>
                                    <img src="1.jpg" alt="" className={styles.pic} />
                                    <div className={styles.chattab}>
                                        <span className={styles.friendname}>Ankit Singh</span>
                                    </div>
                                </div>
                                <div className={styles.friendlists}>
                                    <img src="2.jpg" alt="" className={styles.pic} />
                                    <div className={styles.chattab}>
                                        <span className={styles.friendname}>Ankith Reddy</span>
                                    </div>
                                </div>
                                <div className={styles.friendlists}>
                                    <img src="blank.jpg" alt="" className={styles.pic} />
                                    <div className={styles.chattab}>
                                        <span className={styles.friendname}>Ananya</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Dialog>
                </div>
                <div className={styles.right}>
                    <div className={styles.top}>
                        <img src="1.jpg" alt="" className={styles.profilepic} />
                        <h3 className={styles.username}>Ankit Singh</h3>
                        <div className={styles.menu}>
                            <span className={styles.deletechat}> Delete Chat </span>
                        </div>
                    </div>
                    <div className={styles.middle}>
                        <div className={styles.senttext}>
                            This message was sent
                        </div>
                        <div className={styles.received}>
                            This message was received from Ankit Singh to the Ankit Singh
                        </div>
                    </div>
                    <div className={styles.bottom}>
                        <div className={styles.message}>
                            <input placeholder="Type a message" className={styles.textarea}></input>
                        </div>
                        <div className={styles.send}>
                            <i class="fa-solid fa-paper-plane"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}