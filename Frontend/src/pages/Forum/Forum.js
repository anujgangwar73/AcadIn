import React from "react"
import styles from "./Forum.module.css";
import Topbar from "../../component/Topbar";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

export default function Forum() {
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
                        <h3 className={styles.heading}>Active Forums</h3>
                    </div>
                    <div className={styles.friend}>
                        {/* <span className={styles.nochat}>You don't have any active Forum ( If no current forum )</span> */}
                        <div className={styles.friendlist}>
                            <div className={styles.chattab}>
                                <span className={styles.friendname}>DSA</span>
                                <span className={styles.lastchat}>We all are here to discuss about the very important DSA topics</span>
                            </div>
                        </div>
                        <div className={styles.friendlist}>
                            <div className={styles.chattab}>
                                <span className={styles.friendname}>Sport Events</span>
                                <span className={styles.lastchat}>Events of Sports</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.addforum} onClick={handleClickOpen}>
                        <i class="fa-solid fa-plus"></i>
                    </div>
                    <Dialog open={open} onClose={handleClose}>
                        <div className={styles.dialog}>
                            <DialogTitle >
                                <div className={styles.dialogtitle}>
                                    <span className={styles.dialogtit}>Create New Forum</span>
                                </div>
                                <hr></hr>
                            </DialogTitle>
                            <DialogContent>
                                <div className={styles.dialogbody}>
                                    <span className={styles.dialogtext}>Forum Title</span>
                                    <input placeholder="Enter your text here" className={styles.dialoginput} />
                                </div>
                            </DialogContent>
                            <DialogActions>
                                <div className={styles.dialogclose} onClick={handleClose}>
                                    <span className={styles.dialogcancel}> Cancel </span>
                                    <span className={styles.dialogsave}> Create Forum </span>
                                </div>
                            </DialogActions>
                        </div>
                    </Dialog>
                </div>
                <div className={styles.right}>
                    <div className={styles.top}>
                        <h3 className={styles.username}>Sport Events</h3>
                        <div className={styles.menu}>
                            <span className={styles.deletechat}> Delete Forum </span>
                        </div>
                    </div>
                    <div className={styles.middle}>
                        <div className={styles.senttext}>
                            <span className={styles.sender}>Ankit Singh</span>
                            This message was sent by you
                        </div>
                        <div className={styles.received}>
                            <span className={styles.receiver}>Amartya</span>
                            This message was received from other users of forum
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