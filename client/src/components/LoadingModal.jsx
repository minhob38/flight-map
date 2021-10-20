import styled from "styled-components";

const Modal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 20rem;
  z-index: 10;
  background-color: black;
  opacity: 0.3;
`;

const Loading = styled.div`
  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;
  box-shadow:
    0 -3em rgba(255, 255, 255, 1),
    2.25em -2.25em rgba(255, 255, 255, 0.875),
    3em 0 rgba(255, 255, 255, 0.75),
    2.25em 2.25em rgba(255, 255, 255, 0.625),
    0 3em rgba(255, 255, 255, 0.5),
    -2.25em 2.25em rgba(255, 255, 255, 0.375),
    -3em 0 rgba(255, 255, 255, 0.25),
    -2.25em -2.25em rgba(255, 255, 255, 0.125)
    ;
  animation: spin 1.2s linear infinite;

  @keyframes spin {
  100% { transform: rotate(-360deg) }
}
`;

function LoadingModal() {
  return (
    <Modal>
      <Loading />
    </Modal>
  );
}

export default LoadingModal;
