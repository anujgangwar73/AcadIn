import axios from "axios";
import React,{ useEffect, useState } from "react";
import style from "./Conversation.module.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios("https://acadin.herokuapp.com/user/" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className={style.conversation}>
      {/* <img
        className={style.conversationImg}
        src={
          user
            ? PF + user.profilePicture
            : PF + "Person/noAvatar.png"
        }
        alt=""
      /> */}
      <span className={style.conversationName}>{user?user.username:"none"}</span>
    </div>
  );
}