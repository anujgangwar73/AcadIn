import axios from "axios";
import React,{ useEffect, useState } from "react";
import style from "./Chat.module.css";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("https://acadin.herokuapp.com/user/friends/" + currentId);
      setFriends(res.data);
    };

    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `/conversations/find/${currentId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={style.chatOnline}>
      {onlineFriends.map((o) => (
        <div className={style.chatOnlineFriend} onClick={() => handleClick(o)}>
          <div className={style.chatOnlineImgContainer}>
            <img
              className={style.chatOnlineImg}
              src={
                o.profilePicture
                  ? PF + o.profilePicture
                  : PF + "person/noAvatar.png"
              }
              alt=""
            />
            <div className={style.chatOnlineBadge}></div>
          </div>
          <span className={style.chatOnlineName}>{o.username}</span>
        </div>
      ))}
    </div>
  );
}