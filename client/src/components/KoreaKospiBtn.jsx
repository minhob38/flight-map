import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as actionCreators from "../reducers/stockReducer";

const SLink = styled(Link)`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15rem;
  height: 3rem;
  border-radius: 1rem;
  color: #46565F;
  border: 3px solid #46565F;
  box-sizing: border-box;
  font-weight: 900;
  &:hover {
    background-color: #46565F;
    border: none;
    color: #D0DFE8;
  }
  cursor: pointer;
`;

export default function KoreaKospiBtn() {
  const dispatch = useDispatch();

  const onLinkClick = () => {
    dispatch(actionCreators.koreaKospiClickAsync());
  };

  return (
    <SLink to="/korea/kospi/companies" onClick={onLinkClick}>
      한국 KOSPI 종목
    </SLink>
  );
}
