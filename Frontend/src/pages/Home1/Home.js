import React from "react"
import Topbar from "../../component/Topbar";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import Notification from "../Notification/Notification";
import Chat from "../Chat/Chat";
import Forum from "../Forum/Forum";
import { Link } from "react-router-dom"
export default function Home() {
    return (
        document.body.style.backgroundColor = "white",
        <>
            <Profile />
        </>
    )
}