import styled from "styled-components";
import LoginButton from "./LoginButton";

const SideBarContainer = styled.div`
  width: 350px;
  height: 100%;
  background-color: blue;
`;

export default function SideBar() {
  return (
    <SideBarContainer>
      <LoginButton />
    </SideBarContainer>
  );
}