import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import LoginButton from "./LoginButton";
import LoginForm from "./LoginForm";
import ScrapingButton from "./ScrapingButton";

const SideBarContainer = styled.div`
  position: relative;
  width: 350px;
  height: 100%;
  z-index: 1;
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