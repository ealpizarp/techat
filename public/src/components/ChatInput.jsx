import React, { useState } from "react";
import { HiArrowNarrowUp } from "react-icons/hi";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div class="file-upload">
          <input type="file" />
          <HiArrowNarrowUp></HiArrowNarrowUp>
        </div>
      </div>

      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`

  display: grid;
  align-items: center;
  grid-template-columns: 10% 90%;
  background-color: #1B4965;
  padding-right: 2rem;
  padding-bottom: 0.5;
  padding-top: 0.5;

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0.5rem 1.5rem;
    grid-template-columns: 20% 80%;
    padding-left: 0;
    gap: 1rem;
  }
  @media screen and (max-width: 720px){
    padding: 0.5rem 1.5rem;
    grid-template-columns: 20% 80%;
    padding-left: 0;
  }
  
  .button-container {

    width:100%;
    height:100%;
    display:flex;
    color: white;
    gap: 1rem;
    padding-top: 0.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding-top: 1rem;
    padding-bottom: 0.5rem;
  }
  }

   .file-upload{
    height:50px;
    width:50px;
    border-radius: 100px;
    position:relative;
    
    display:flex;
    justify-content:center;
    align-items: center;  

    border:4px solid #FFFFFF;
    overflow:hidden;
    background-image: linear-gradient(to bottom, #2590EB 50%, #FFFFFF 50%);
    background-size: 100% 200%;
    transition: all 1s;
    color: #FFFFFF;
    font-size:100px;

    input[type='file']{
      height:50px;
      width:50px;
      position:absolute;
      top:0;
      left:0;
      opacity:0;
      cursor:pointer;

    }&:hover{

      background-position: 0 -100%;

      color:#2590EB;

      }

  }


  .input-container {
    padding: 0rem 0rem;
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    @media screen and (max-width: 1080px){
    padding-left: 0;
  }
    
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #034078;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #1a535c;
      padding: 0.3rem 1rem;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      @media screen and (max-width: 720px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 0.3rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;
