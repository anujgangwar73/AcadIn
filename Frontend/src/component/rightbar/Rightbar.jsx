import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from "../../context/AuthContext";
import "./rightbar.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Rightbar() {
  const [followings, setFollowings] = useState([]);
  const { user: currentUser } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(async () => {
    if (!currentUser) return;

    const followingList = await axios.get(`https://acadin.herokuapp.com/user/friends/${currentUser._id}`);
    // console.log(followingList.data);
    setFollowings(followingList.data);
  }, [currentUser]);
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          <li className="rightbarFriend">
            {
              followings.map((friend) =>
                <div key={friend._id} className="rightbarProfileImgContainer">
                  <img src={friend.profilePicture
                    ? PF + friend.profilePicture
                    : PF + "noAvatar.png"} alt="" className='rightbarProfileImg' />
                  <Link to={`/profile/${friend._id}`} className="linknew" ><span className="rightbarUsername">{friend.username}</span></Link>
                </div>
              )
            }
          </li>
        </ul>
      </div>
    </div>
  )
}