import styled from "styled-components";
import SideBar from "./components/SideBar";
import CompanyList from "./components/CompanyList";

const AppContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
`;

const Sample = styled.div`
  width: 800px;
  background-color: red;
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
      <CompanyList />
      {/* <Sample /> */}
    </AppContainer>
  );
}

export default App;
