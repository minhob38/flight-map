import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import LoginButton from "./LoginButton";
import LoginForm from "./LoginForm";
import ScrapingButton from "./ScrapingButton";

const SideBarContainer = styled.div`
  position: relative;
  flex-shrink: 0;
  z-index: 1;
  width: 20rem;
  height: 100%;
  background-color: lightgray;
`;

export default function SideBar() {
  const isLoginClicked = useSelector((state) => {
    return state.auth.isLoginClicked;
  });

  return (
    <SideBarContainer>
      <LoginButton />
      {isLoginClicked && <LoginForm />}
      <ScrapingButton />
    </SideBarContainer>
  );
}