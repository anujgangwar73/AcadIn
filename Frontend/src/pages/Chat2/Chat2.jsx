import Topbar from "../../component/Topbar.js";
import Conversation from "../../component/conversation/Conversation";
import Message from "../../component/message/Message";
import ChatOnline from "../../component/chatOnline/ChatOnline";
import React,{ useContext, useEffect, useRef, useState } from "react";
import Dialog from '@material-ui/core/Dialog';
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";
import style from "./Chat.module.css";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const socket = useRef();
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();

  const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
       
        setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

  useEffect(() => {
    socket.current = io("https://acadinsocketio.herokuapp.com/");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    if (arrivalMessage && currentChat && currentChat.members.includes(arrivalMessage.sender)) {
      messages.push(arrivalMessage);
      setMessages(messages);
    }
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("https://acadin.herokuapp.com/conversations/" + user._id);
        
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    const getFriends = async () => {
      try {
        const followingList = await axios.get(`https://acadin.herokuapp.com/user/friends/${user._id}`);
      
        setFollowings(followingList.data);
      } catch (error) {
        console.log(error);
      }
    }
    getConversations();
    getFriends();
  }, [user._id]);

  

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("https://acadin.herokuapp.com/messages/" + currentChat._id);
        // console.log(res.data);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("https://acadin.herokuapp.com/messages", message);
      // console.log(res.data);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };
  const addConversation = async(id) => {
    const body = {
      senderId: user._id,
      receiverId: id
    }
    try {
      const res = await axios.post("https://acadin.herokuapp.com/conversations", body);
      setConversations([...conversations, res.data]);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  }
  // useEffect(() => {
  //   scrollRef.current.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  return (
    <>
      <Topbar />
      <div className={style.messenger}>
        <div className={style.chatMenu}>
          <div className={style.chatMenuWrapper}>
            {/* <input placeholder="Search for friends" className={style.chatMenuInput} /> */}
            {conversations.map((c) => (
              <div key={conversations._id} onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
            <div className={style.addfriendstochat} onClick={handleClickOpen}>
              <i class="fa-solid fa-user-plus"></i>
            </div>
            <Dialog open={open} onClose={handleClose}>
              {/* Search Bar + list of current friends and modify this list as per search and print no user found accordingly */}
              <div className={style.dialog}>
                <div className={style.searchspace}>
                  <div className={style.search}>
                    <div className={style.searchbox}>
                      {/* <input placeholder="Search friend" className={style.searchinput}></input>
                      <div className={style.searchicon}>
                        <i className="fa fa-search"></i>
                      </div> */}
                      Add a friend to Chat
                    </div>
                    {/* Add a friend to Chat */}
                  </div>
                  <hr></hr>
                </div>
                <div className={style.dialoglist}>
                {/* <span className={style.nofound}> No User Found </span> */}
                {
                  followings.map((friend) => 
                  <div className={style.friendlists} key={friend._id}>
                    <img src="blank.jpg" alt="" className={style.pic} />
                    <div className={style.chattab}>
                      <span className={style.friendname} onClick={()=> addConversation(friend._id)}>{friend.username}</span>
                    </div>
                  </div>
                  )
                }
                </div>
              </div>
            </Dialog>
          </div>
        </div>
        <div className={style.chatBox}>
          <div className={style.chatBoxWrapper}>
            {currentChat ? (
              <>
                <div className={style.chatBoxTop}>
                  {messages.map((m) => (
                    <div key={messages._id}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))}
                </div>
                <div className={style.chatBoxBottom}>
                  <textarea
                    className={style.chatMessageInput}
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className={style.chatSubmitButton} onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className={style.noConversationText}>
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className={style.chatOnline}>
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
}