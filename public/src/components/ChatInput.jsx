import React, { useEffect, useState } from "react";
import { HiArrowNarrowUp } from "react-icons/hi";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";

export default function ChatInput({ handleSendMsg, handleSendAttch }) {

  const [msg, setMsg] = useState("");
  const [file, setFile] = useState();
  var imgSrc;

  const selectFile = (event) => {
    setMsg(event.target.files[0].name);
    setFile(event.target.files[0]);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (file) {
      const reader = new FileReader();
      reader.addEventListener('load', (event) => {
      imgSrc = event.target.result.toString("Base64");
      handleSendAttch(file, imgSrc);
    });
    reader.readAsDataURL(file);
    event.target.value = null;
    } else {
      if (msg.length > 0) {
        handleSendMsg(msg);
      }
    }
    setMsg("");
    setFile();
  };

  return (
    <Container>
      <div></div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <div className="button-container">
          <div class="file-upload">
            <input type="file" onChange={selectFile} />
            <HiArrowNarrowUp></HiArrowNarrowUp>
          </div>
        </div>
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
  grid-template-columns: 0% 100%;
  background-color: #1b4965;

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-columns: 0% 100%;
  }
  @media screen and (max-width: 720px) {
    grid-template-columns: 0% 100%;
    padding-left: 0;
  }

  .button-container {
    width: auto;
    height: 100%;
    display: flex;
    color: white;
    gap: 0rem;

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      padding-top: 1rem;
      padding-bottom: 0.8rem;
    }
  }

  .file-upload {
    height: 50px;
    width: 50px;
    border-radius: 100px;
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    border: 4px solid #ffffff;
    overflow: hidden;
    background-image: linear-gradient(to bottom, #2590eb 50%, #ffffff 50%);
    background-size: 100% 200%;
    transition: all 1s;
    color: #ffffff;
    font-size: 100px;

    input[type="file"] {
      height: 50px;
      width: 50px;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      cursor: pointer;
    }
    &:hover {
      background-position: 0 -100%;

      color: #2590eb;
    }
  }

  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0rem;
    background-color: #ffffff34;
    @media screen and (max-width: 1080px) {
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
