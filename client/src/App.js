import styled from "styled-components";
import SideBar from "./components/SideBar";

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vw;
  background-color: red;
`;

const Map = styled.div`
  flex: 1;
  height: 100%;
  background-color: tomato;
`;

function App() {
  return (
    <AppContainer>
      <SideBar />
      <Map />
    </AppContainer>
  );
}

export default App;
