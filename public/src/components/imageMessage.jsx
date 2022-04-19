import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function Image( {blob} ) {
  const [imageSrc, setimageSrc] = useState("");


  useEffect(async () => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
          setimageSrc(reader.result)
      }
}, [blob]);

return (
    <Container>
    <img src={imageSrc} alt="attachment"></img>
    </Container>
);

};

const Container = styled.div`

  img {
      display: flex;
      width: 180px;
      height: auto;
      border-radius: 1rem;
      
  }

`;