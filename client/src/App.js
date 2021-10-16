import styled from "styled-components";
import SideBar from "./components/SideBar";
import Map from "./components/Map";

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vw;
`;

function App() {
  return (
    <AppContainer>
      <SideBar />
      {/* <Map /> */}
      {/* file upload 테스트용, 임시 form 버튼  */}
      {/* <form encType="multipart/form-data" method="post" action="/api/auth/upload/">
        <input name="hello" type="file" />
        <input type="submit" />
      </form> */}
    </AppContainer>
  );
}

export default App;
