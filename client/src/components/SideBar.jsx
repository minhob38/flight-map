import styled from "styled-components";
import { useSelector } from "react-redux";
import LoginButton from "./LoginButton";
import LoginForm from "./LoginForm";

const SideBarContainer = styled.div`
  position: relative;
  width: 350px;
  height: 100%;
  background-color: blue;
`;

export default function SideBar() {
  const isLoginClicked = useSelector(state => {
    return state.auth.isLoginClicked
  })

  return (
    <SideBarContainer>
      <LoginButton />
      {isLoginClicked && <LoginForm />}
    </SideBarContainer>
  );
}