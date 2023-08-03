import React from "react"
import "./sidebar.css"
import { RssFeed, Chat, Group } from "@material-ui/icons"
import { Link } from "react-router-dom"
// import { Users } from "../../dummyData";
// import CloseFriend from "../closeFriend/CloseFriend";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <Link to="/chat" className="linktemp"><li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li></Link>

        </ul>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {/* <li className="sidebarFriend">
          <img className="sidebarFriendImg" src = "/assets/person/2.jpeg" alt = ""/> 
          <span className="sidebarFriendName">Rakesh Roy</span>
          </li>
          */}

        </ul>
      </div>
    </div>
  );
}