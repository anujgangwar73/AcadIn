import React, { useState, useContext, createRef } from "react"
import "./topbar.css"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext";
import Menu from "@material-ui/core/Menu";
import axios from "axios";

export default function Topbar() {
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    const [anchorEl, setAnchorEl] = useState(null);
    const [users, setUsers] = useState([]);
    const query = createRef();
    
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick = (event) => {
        axios.get(`https://acadin.herokuapp.com/user/search?username=${query.current.value}`)
        .then((res) => {
            // console.log(res.data);
            setUsers(res.data);
            setAnchorEl(event.target);
        })
    };

    return (
        <div className="topbar">
            <div className="left">
                <span className="logo">AcadIn</span>
            </div>
            <div className="center">
                <div className="search">
                    <div className="searchicon" onClick={handleClick}>
                        <i className="fa fa-search"></i>
                    </div>
                    <input placeholder="Search for friends" className="searchinput" ref={query}></input>
                </div>
                <Menu anchorEl={anchorEl} onClose={handleClose} open={Boolean(anchorEl)} className="menu">
                    <div className="menuitem">
                        {
                            users.length === 0 ?
                                <span className="notfound">No Results Found </span>
                            :
                                users.map(user => 
                                    <div className="friendlists" key={user._id}>
                                        <img src={PF + "noAvatar.png"} alt="profile_pic" className="pic" />
                                        <Link to={`/profile/${user._id}`} ><span className="friendname">{user.username}</span></Link>
                                    </div>    
                                )
                        }
                    </div>
                </Menu>
            </div>
            <div className="right">
                <div className="topbaricons">
                    <div className="fonticon">
                        <Link to='/' className="links"> <i className="fa-solid fa-house-chimney"></i> </Link>
                    </div>
                    <div className="fonticon">
                        <Link to='/chat' className="links">
                            <i className="fa-solid fa-message"></i>
                        </Link>
                    </div>
                    {/* <div className="fonticon">
                        <Link to='/forum' className="links">
                            <div className="logoforum">
                                <i className="fa-solid fa-users-viewfinder"></i>
                            </div>
                        </Link>
                    </div> */}
                </div>
                <Link to={`/profile/${user._id}`} className="links">
                    <img src={user.profilePicture
                        ? PF + user.profilePicture
                        : PF + "noAvatar.png"} alt="" className="pic" />
                </Link>
                <Link to='/login' className="links">
                    <div className="logout">
                        <span className="logoutbutton"> Logout </span>
                        <i className="fa-solid fa-right-from-bracket"></i>
                    </div>
                </Link>
            </div>
        </div>
    )
}