import React, { useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/logo2.gif";

export default function Welcome({ currentUser }) {
  return (
    <Container>
      <img src={Robot} alt="Robot" />
      <h1>
        Welcome, <span>{currentUser.username}</span>
      </h1>
      <h3>Start Messaging....</h3>
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
    height: 20rem;
    padding-right: 68px;
    padding-bottom: 25px;
  }
  span {
    color: #df8800;
  }
`;
