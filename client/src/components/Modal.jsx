import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import * as actionCreators from "../reducers/appReducer";

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 20rem;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.3);
`;

export default function Modal({ children }) {
  const dispatch = useDispatch();

  const handleClickModal = (ev) => {
    if (ev.currentTarget === ev.target) {
      dispatch(actionCreators.modalOff());
    }
  };

  return (
    <ModalContainer onClick={handleClickModal}>
      {children}
    </ModalContainer>
  );
}
