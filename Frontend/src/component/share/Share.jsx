import "./share.css";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@material-ui/icons";
import React,{ useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";


export default function Share(props) {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // const desc = useRef();
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const descChangeHandler = (e) => {
    setDesc(e.target.value);
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      // console.log(newPost);
      try {
        await axios.post("https://acadin.herokuapp.com/upload", data);
      } catch (err) {}
    }
    try {
      await axios.post("https://acadin.herokuapp.com/posts", newPost);
      // window.location.reload();
      setDesc("");
      props.onSubmit();
      setFile(null);
    } catch (err) {}
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
        <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "noAvatar.png"
            }
            alt=""
          />
          <input
            placeholder="Achievements or Guidance?"
            className="shareInput"
            value={desc}
            onChange={descChangeHandler}
          />
        </div>
        <hr className="shareHr"/>
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
        <div className="shareBottom">
            <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
                    <PermMedia htmlColor="tomato" className="shareIcon"/>
                    <span className="shareOptionText">Photo or Video</span>
                    <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
              </label>
                </div>
            </div>
            <button className="shareButton" type="submit">Post</button>
            </form>
        </div>
      </div>
  
  );
}
