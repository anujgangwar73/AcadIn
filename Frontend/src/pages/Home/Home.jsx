import React from 'react'
import Topbar from "../../component/Topbar";
import Sidebar from "../../component/sidebar/Sidebar";
import Feed from "../../component/feed/Feed";
import Rightbar from "../../component/rightbar/Rightbar";
import "./home.css"

export default function Home() {
    return (
        document.body.style.backgroundColor = "white",
        <div className="home">
            <Topbar />
            <div className="homeContainer">
                <Sidebar />
                <Feed />
                <Rightbar />
            </div>
        </div>
    );
}