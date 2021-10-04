import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 500px;
  background-color: red;
`;

const SideBar = styled.div`
  width: 350px;
  height: 500px;
  background-color: blue;
`;

const Map = styled.div`
  flex: 1;
  height: 500px;
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
