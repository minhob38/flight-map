import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import LoginButton from "./LoginButton";
import LoginForm from "./LoginForm";
import KoreaKospiBtn from "./KoreaKospiBtn";

const SideBarContainer = styled.div`
  position: relative;
  flex-shrink: 0;
  z-index: 1;
  width: 20rem;
  height: 100%;
  /* background-color: #46565F; */
  background-color: #92A5B4;
`;

export default function SideBar() {
  const isLoginClicked = useSelector((state) => {
    return state.auth.isLoginClicked;
  });

  return (
    <SideBarContainer>
      <LoginButton />
      {isLoginClicked && <LoginForm />}
      <KoreaKospiBtn />
    </SideBarContainer>
  );
}