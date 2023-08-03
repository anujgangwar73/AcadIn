import React, { useState, useEffect, useContext, createRef } from "react"
import styles from "./Profile.module.css";
import Topbar from "../../component/Topbar";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import axios from "axios";
import { useParams } from "react-router-dom";
import Feed from "../../component/feed/Feed";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Profile() {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState({});
    const { user: currentUser, dispatch } = useContext(AuthContext);
    const { id } = useParams();
    const [followed, setFollowed] = useState(false);
    const [followings, setFollowings] = useState([]);
    // const [file, setFile] = useState(null);

    const username = createRef();
    const bio = createRef();
    const education = createRef();
    const experience = createRef();
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(async () => {
        if (!id) return;
        const res = await axios.get(`https://acadin.herokuapp.com/user/${id}`);
        
        setUser(res.data);

        const followingList = await axios.get(`https://acadin.herokuapp.com/user/friends/${id}`);
       
        setFollowings(followingList.data);
        setFollowed(currentUser.followings.includes(id));
    }, [id]);

    const submitHandler = async (e) => {
        e.preventDefault();
        // setFile(e.target.files[0]);
      
        const file = e.target.files[0];
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            //   currentUser.profilePicture = fileName;
            //   console.log(newPost);
            try {
                await axios.post("https://acadin.herokuapp.com/upload", data);
            } catch (err) {
                console.log(err);
            }

            try {
                const body = { userId: currentUser._id, profilePicture: fileName }
                const res = await axios.put("https://acadin.herokuapp.com/user/updatePic", body);
                if(res.status === 200) {
                    setUser({ ...user, profilePicture: fileName });
                    dispatch({type: "UPDATE_DP", payload: fileName});
                }
                // console.log(res.data);
            } catch (err) {
                // console.log(err);
            }
        }
    };


    const updateUser = async () => {
       
        const body = { userId: currentUser._id, username: username.current.value, bio: bio.current.value, education: education.current.value, experience: experience.current.value };
        const res = await axios.put(`https://acadin.herokuapp.com/user/${id}/updatebio`, body);
        
        setUser(res.data);
    }

    const followUser = async () => {
        try {
            const body = { userId: currentUser._id };
            if (followed) {
                const res = await axios.put(`https://acadin.herokuapp.com/user/${id}/unfollow`, body);
                if (res.status === 200)
                    dispatch({ type: "UNFOLLOW", payload: id });
                
            } else {
                const res = await axios.put(`https://acadin.herokuapp.com/user/${id}/follow`, body);
                if (res.status === 200)
                    dispatch({ type: "FOLLOW", payload: id });
                
            }
            setFollowed(!followed);
        } catch (error) {
            if (error.response)
                console.error(error.response.data);
            else
                console.error(error);
        }
    }

    return (
        document.body.style.backgroundColor = "white",
        <div className={styles.page}>
            < Topbar />
            <div className={styles.profile}>
                <div className={styles.info}>
                    <div className={styles.cover}>
                        <img src={PF + "noCover.png"} alt="" className={styles.coverpic} />
                        {/* <button className={styles.editcover}>
                            <i class="fa-solid fa-camera"></i>
                        </button> */}
                        <img src={user.profilePicture
                            ? PF + user.profilePicture
                            : PF + "noAvatar.png"} alt="" className={styles.profilepic} />
                        {
                            id === currentUser._id && (
                                <button className={styles.editprofile}>
                                    <label htmlFor="dp" className="shareOption">
                                        <i className="fa-solid fa-camera"></i>
                                        <input
                                        style={{ display: "none" }}
                                        type="file"
                                        id="dp"
                                        accept=".png,.jpeg,.jpg"
                                        onChange={submitHandler}
                                        />
                                    </label>
                                </button>
                            )
                        }
                        
                    </div>
                    <h4 className={styles.username}>{user.username}</h4>
                    <span className={styles.bio}> {user.bio} </span>
                    {/* Remove edituderprofile for friend's profile */}
                    {
                        id === currentUser._id && (
                            <span className={styles.edituserprofile} onClick={handleClickOpen}>
                                <i className="fa-solid fa-pen"></i>
                                <span className={styles.space}>Edit profile</span>
                            </span>
                        )
                    }

                    <Dialog open={open} onClose={handleClose}>
                        <div className={styles.dialog}>
                            <DialogTitle >
                                <div className={styles.dialogtitle}>
                                    <span className={styles.dialogtit}>Edit Profile</span>
                                    <span className={styles.dialogwarn}>Warning* : Don't enter anything to the field that you don't want to change</span>
                                </div>
                                <hr></hr>
                            </DialogTitle>
                            <DialogContent>
                                <div className={styles.dialogbody}>
                                    <span className={styles.dialogtext}>Name </span>
                                    <input placeholder="Enter your Name" className={styles.dialoginput} ref={username} />
                                </div>
                                <div className={styles.dialogbody}>
                                    <span className={styles.dialogtext}>Bio </span>
                                    <input placeholder="Enter bio here" className={styles.dialoginput} ref={bio} />
                                </div>
                                <div className={styles.dialogbody}>
                                    <span className={styles.dialogtext}>Education </span>
                                    <input placeholder="Enter you Highest Education" className={styles.dialoginput} ref={education} />
                                </div>
                                <div className={styles.dialogbody}>
                                    <span className={styles.dialogtext}>Experience </span>
                                    <input placeholder="Enter your Experience" className={styles.dialoginput} ref={experience} />
                                </div>
                                {/* <div className={styles.dialogbody}>
                                    <span className={styles.dialogtext}>About </span>
                                    <input placeholder="Enter about you" className={styles.dialoginput} />
                                </div> */}
                            </DialogContent>
                            <DialogActions>
                                <div className={styles.dialogclose} onClick={handleClose}>
                                    <span className={styles.dialogcancel}> Cancel </span>
                                    <span className={styles.dialogsave} onClick={updateUser}> Save Changes </span>
                                </div>
                            </DialogActions>
                        </div>
                    </Dialog>
                    {/* Remove addnew division for self profile */}
                    <div className={styles.addnew}>
                        {
                            id !== currentUser._id && (
                                <>
                                    <span className={styles.addfriend}>
                                        <i className="fa-solid fa-user-plus"></i>
                                        <span className={styles.space} onClick={followUser}>{followed ? "UnFollow" : "Follow"}</span>
                                    </span>
                                    <Link to="/chat" className={styles.links}>
                                        <span className={styles.textfriend}>
                                            <i className="fa-brands fa-facebook-messenger"></i>
                                            <span className={styles.space}>Message</span>
                                        </span>
                                    </Link>
                                </>
                            )
                        }
                    </div>
                </div>
                <div className={styles.about}>
                    <div className={styles.wrap}>
                        <div className={styles.feed}>
                            <div className={styles.division}>
                                <div className={styles.content}>
                                    <h3 className={styles.heading}>Education</h3>
                                    <span className={styles.value}> {user.education} </span>
                                    <hr></hr>
                                    <h3 className={styles.heading}>Experience</h3>
                                    <span className={styles.value}> {user.experience} </span>
                                    <hr></hr>
                                    {/* <h3 className={styles.heading}>About</h3>
                                    <span className={styles.value}>Keep or Discard this field as per your planning </span> */}
                                </div>
                            </div>
                            <div className={styles.division}>
                                <div className={styles.content}>
                                    <h3 className={styles.friend}>Following</h3>
                                    <div className={styles.friendflex}>
                                        {
                                            followings.map((friend) =>
                                                <div key={friend._id} className={styles.friendlist}>
                                                    <img src={friend.profilePicture
                                                        ? PF + friend.profilePicture
                                                        : PF + "noAvatar.png"} alt="" className="pic" />
                                                    <Link to={`/profile/${friend._id}`} className={styles.links} style={{ color: "white" }}><span className={styles.friendname}>{friend.username}</span></Link>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.post}>
                            <Feed username={user.username}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}