import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import * as actionCreators from "../reducers/stockReducer";

const Button = styled.button`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 3rem;
  border: 1px solid black;
  &:hover {
    background-color: gray;
  }
`;

export default function LoginButton() {
  const dispatch = useDispatch();

  const onBtnClick = () => {
    dispatch(actionCreators.koreaKospiClickAsync());
  };

  return <Button onClick={onBtnClick}>Coin Scraping</Button>;
}
