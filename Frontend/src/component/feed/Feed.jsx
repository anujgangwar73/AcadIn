import React,{ useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({username}) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const PF=process.env.PUBLIC_URL
  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("https://acadin.herokuapp.com/posts/profile/" + username)
        : await axios.get("https://acadin.herokuapp.com/posts/timeline/" + user._id);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]);

  const fetchPosts = async () => {
    const res = username
        ? await axios.get("https://acadin.herokuapp.com/posts/profile/" + username)
        : await axios.get("https://acadin.herokuapp.com/posts/timeline/" + user._id);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
  }
  return (
    <div className="feed">
      <div className="feedWrapper">
      {(!username || username === user.username) && <Share onSubmit={fetchPosts} />}
        {posts.map((p) => (
          <Post key={p._id} postId={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
