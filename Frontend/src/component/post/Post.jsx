import { MoreVert } from "@material-ui/icons";
import React,{ useContext, useEffect, useState } from "react";
import axios from "axios";
import style from "./post.module.css";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {like} from "../../like.png";
import {heart} from "../../heart.png";
import Comments from "../Comments.js"
import { Button, TextField } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';

export default function Post({ postId, post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [comment, setComment] = useState(false);
  const [commentData, setCommentData] = useState("");
  const [commentList, setCommentList] = useState([]);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const { user: currentUser } = useContext(AuthContext);

  // showAlert(()=> {
  //   alert("I'm an alert");
  // });
  const App = () => { const number = 10; return ( <div> <p>Number: {number}</p> </div> ); };

function element( ){
 setComment(!comment)
//  console.log('hello comment')
};

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`https://acadin.herokuapp.com/user/${post.userId}`);
      setUser(res.data);
    };
    const fetchComments = async () => {
      const res = await axios.get(`https://acadin.herokuapp.com/posts/comment/${postId}`);
      // console.log(res.data);
      setCommentList(res.data);
    }
    fetchUser();
    fetchComments();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put("https://acadin.herokuapp.com/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const commentHandler = (e) => {
    // console.log(e.target.value);
    setCommentData(e.target.value);
  }  
  const commentPost = async (id) => {
    try {
      const body = {
        username: currentUser.username,
        postId: id,
        comment: commentData
      }
      await axios.put("https://acadin.herokuapp.com/posts/comment", body);
      setCommentList([...commentList, {username: currentUser.username, comment: commentData}]);
      setCommentData("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
    <div className={style.post}>
      <div className={style.postWrapper}>
        <div className={style.postTop}>
          <div className={style.postTopLeft}>
            <Link to={`/profile/${user.username}`}>
              <img
                className={style.postProfileImg}
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "noAvatar.png"
                }
                alt=""
              />
            </Link>
            <span className={style.postUsername}>{user.username}</span>
            <span className={style.postDate}>{format(post.createdAt)}</span>
          </div>
          <div className={style.postTopRight}>
            <MoreVert />
          </div>
        </div>
        <div className={style.postCenter}>
          <span className={style.postText}>{post.desc}</span>
          <img className={style.postImg} src={PF + post.img} alt="" />
        </div>
        <div className={style.postBottom}>
          <div className={style.postBottomLeft}>
            <img
              className={style.likeIcon}
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=""
            />
            <span className={style.postLikeCounter}>{like} people like it</span>
          </div>
          <div className={style.postBottomRight}>
            <span className={style.postCommentText}>{post.comment}</span>
            <button style={{border:'none',padding:"10px",borderRadius:'5px',backgroundColor:'aliceblue'}} className="comment_button" onClick = {element}> comments</button>
            <div onClick={() => setComment(!comment)}>
          
          </div>   
          </div>
        </div>
        {comment ?
            <div className="comments" style={{marginTop:'5%'}}>
              <form className="post_form">
                <TextField
                   label = "Add comment"
                   size="small"
                   variant="outlined"
                   className="post_input"
                   placeholder="Add comment"
                   style={{width:'70%'}}
                   onChange={commentHandler}
                   value={commentData}
                />
                <Button
                 variant="contained"
                 size="small"
                 endIcon={<SendIcon/>}
                 style={{marginLeft:'5%',padding:'8px',backgroundColor:'#ff6347',color:'white'}}
                  onClick={() => commentPost(postId)}
                >
                  Send
                </Button>
              </form> 
               <Comments comments={commentList} /> 
            </div>: <div>
            </div>
          } 
      </div>
    </div>
</div>
);
}