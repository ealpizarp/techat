import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot2.gif";
export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(async () => {
    setUserName(
      await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      ).username
    );
  }, []);
  return (
    <Container>
      <img src={Robot} alt="Welcome image" />
      <h1>
        Hi, <span>{userName}!</span>
      </h1>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 10rem;
  }
  span {
    color: #06bee1;
  }

  @media screen and (max-width:720px) {
    display: flexbox;

    .h1 {
      font-size: 4rem;
    }

    img {
      height: 10rem;
    }
  }


`;
