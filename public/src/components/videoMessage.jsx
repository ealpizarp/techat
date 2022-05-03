import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function Video( {blob} ) {
  const [videoSrc, setvideoSrc] = useState("");


  useEffect(async () => {
    var URL = window.URL || window.webkitURL;
    console.log(blob);
    var url = URL.createObjectURL(blob);
    setvideoSrc(url);

}, [blob]);

return (
    <Container>
    <video width="220" height="140" controls>
        <source src={videoSrc} type="video/mp4" ></source>
    </video>
    </Container>
);

};

const Container = styled.div`

  video {
      display: flex;
      width: 220px;
      height: auto;
      border-radius: 1rem;
      
  }

`;