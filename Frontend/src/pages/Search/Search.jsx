import React from 'react'
import "./search.css"
import Topbar from "../../component/Topbar";
import { MoreVert,ThumbUp,Comment,Forum} from "@material-ui/icons";

export default function Search() {
  return (
      <>
          <Topbar />
          <div className="searchContainer">
            <div className="postsContainer">
            <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src="/assets/person/1.jpg"
              alt=""
            />
            <span className="postUsername">Rani Sharma</span>
            <span className="postDate">25 mins ago</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">Hey! Its my first post:)</span>
          <img src="assets/post/1.png" className="postImg" alt="" />
        </div>
        <hr className="postHr" />
        <div className="postBottom">
          {/* <div className="postBottomLeft">
            <img className="likeIcon" src="assets/like.png" alt="" />
            <img className="likeIcon" src="assets/heart.png" alt="" />
            <span className="postLikeCounter">12 people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">18 comments</span>
          </div> */}
          <div className='postLike'>
            <li className="sidebarListItem">
              <ThumbUp className="sidebarIcon"/>
              <span className="sidebarListItemText">Like</span>
            </li>
          </div>
          <div className='postComment'>
            <li className="sidebarListItem">
              <Comment className="sidebarIcon"/>
              <span className="sidebarListItemText">Comment</span>
            </li> 
          </div>
          <div className='postCreateForum'>
          <li className="sidebarListItem">
              <Forum className="sidebarIcon"/>
              <span className="sidebarListItemText">Create Discussion Forum</span>
            </li>
          </div>
        </div>
      </div>
    </div>
            </div>
            <div className="profileContainer">
               these will be profiles
            </div>
          </div>
      </>
  );
}