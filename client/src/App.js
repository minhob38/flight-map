import styled from "styled-components";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";

import SideBar from "./components/SideBar";
import CompanyList from "./components/CompanyList";
import FundAnalysis from "./components/FundAnalysis";
import LoadingModal from "./components/LoadingModal";
import Modal from "./components/Modal";

const AppContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
`;

// const Modal = styled.div`
//   position: fixed;
//   top: 0;
//   right: 0;
//   bottom: 0;
//   left: 0;
//   z-index: 10;
//   background-color: red;
//   opacity: 0.5;
// `;

function App() {
  const isLoading = useSelector((state) => {
    return state.app.isLoading;
  });

  return (
    <AppContainer>
      <SideBar />
      {/* <Map /> */}
      {/* file upload 테스트용, 임시 form 버튼  */}
      {/* <form encType="multipart/form-data" method="post" action="/api/auth/upload/">
        <input name="hello" type="file" />
        <input type="submit" />
      </form> */}
      {isLoading && (
        <Modal>
          <LoadingModal />
        </Modal>
      )}
      <Route path="/korea/kospi/companies">
        <CompanyList />
      </Route>
      <Route path="/fundamental-analysis/companies">
        <FundAnalysis />
      </Route>
    </AppContainer>
  );
}

export default App;
