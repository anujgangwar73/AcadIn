import "./online.css";
import React from 'react'

export default function Online() {
  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img className="rightbarProfileImg" src="assets/person/5.jpg" alt="" />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">Venkatesh Iyer</span>
    </li>
  );
}