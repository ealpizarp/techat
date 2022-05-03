import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import Image from "./imageMessage";
import Video from "./videoMessage";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute, sendAttachmentRoute } from "../utils/APIRoutes";
import 'react-medium-image-zoom/dist/styles.css'
import Contacts from "./Contacts";

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    const response = await axios.post(recieveMessageRoute, {
      from: data._id,
      to: currentChat._id,
    });
    setMessages(response.data);
   }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      message: msg,
      type: "text",
    });
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
      type: "text",
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg, type: "text" });
    setMessages(msgs);
  };

 
   const handleSendAttch = async (file, imageSrc) => {

    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );

    const type = file.type.split('/')[0];
    var SocketTypeHeader;


    if(type === "image") {
      SocketTypeHeader = "imageSocket"  
    } else if(type === "video"){
      SocketTypeHeader = "videoSocket"
    }

    const messageObject = {
      to: currentChat._id,
      from: data._id,
      message: file,
      type: SocketTypeHeader,
    };
    socket.current.emit("send-msg", messageObject);

    var typeHeader;

    if(type === "image") {
      typeHeader = "image"  
    }
    if(type === "video"){
      typeHeader = "video"
    }

    const DBmessageObject = {
      from: data._id,
      to: currentChat._id,
      message: imageSrc,
      type: typeHeader,
    };

    await axios.post(sendMessageRoute, DBmessageObject);


    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: file, type: SocketTypeHeader});
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (data) => {
        setArrivalMessage({ fromSelf: false, message: data.message, type:data.type});
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const renderMessages = (message) => {
    if (message.type === "image") {
      return (
        <div ref={scrollRef} key={uuidv4()}>
          <div
            className={`message ${message.fromSelf ? "sended" : "recieved"}`}
          >  
            <img src={message.message} alt="attachment"></img>
          </div>
        </div>
      );
    }
    
    if (message.type === "video") {
      return (
        <div ref={scrollRef} key={uuidv4()}>
          <div
            className={`message ${message.fromSelf ? "sended" : "recieved"}`}
          >  
          <video width="220" height="140" controls>
            <source src={message.message} type="video/mp4"></source>
          </video>

          </div>
        </div>
      );
    }

    if (message.type === "videoSocket") {
      const videoBlob = new Blob([message.message], {type:"video/mp4"});
      console.log(videoBlob);
      
      return (
        <div ref={scrollRef} key={uuidv4()}>
          <div
            className={`message ${message.fromSelf ? "sended" : "recieved"}`}
          >
              <Video blob={videoBlob} > </Video>
          </div>
        </div>
      );
    }
    
    if (message.type === "imageSocket") {
      console.log(message.mesage);
      const imageBlob = new Blob([message.message]);
      return (
        <div ref={scrollRef} key={uuidv4()}>
          <div
            className={`message ${message.fromSelf ? "sended" : "recieved"}`}
          >
              <Image blob={imageBlob}></Image>
          </div>
        </div>
      );
    } else {
      return (
        <div ref={scrollRef} key={uuidv4()}>
          <div
            className={`message ${message.fromSelf ? "sended" : "recieved"}`}
          >
            <div className="content ">
              <p>{message.message}</p>
            </div>
          </div>
        </div>
      );
    }
    
  };

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt=""
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        { messages.map((renderMessages))}
      </div>
      <ChatInput
        handleSendMsg={handleSendMsg}
        handleSendAttch={handleSendAttch}
      />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  border-bottom-right-radius: 0.8rem;

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  @media screen and (max-width: 720px) {
    grid-template-rows: 10% 80% 10%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2.5rem 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #1b4965;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 0.7rem;
        font-size: 0.9rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          font-size: 0.7rem;
          padding: 0.7rem;
          max-width: 70%;
        }
        @media screen and (max-width: 720px) {
          max-width: 90%;
          font-size: 0.8rem;
          padding: 0.6rem;
        }
      }
      video {
      display: flex;
      width: 220px;
      height: auto;
      border-radius: 1rem;
      
      }
      
      img {
      display: flex;
      width: 180px;
      height: auto;
      border-radius: 1rem;
      
  }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #33658a;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #33658a;
      }
    }
  }
`;
