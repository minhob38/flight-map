import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import * as colors from "../constants/colors";

const ToolTipContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 15rem;
  height: 6rem;
  border-radius: 0.5rem;
  background-color: ${colors.PRIMARY_GRAY};
`;

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 56%;
  color: ${colors.TERNARY_GRAY};
  font-weight: 900;
`;

const SLink = styled(Link)`
  all: unset;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width:  8.5rem;
  height: 5rem;
  color: #46565F;
  font-weight: 900;
  &:hover {
    color: orange;
  }
  color: ${colors.TERNARY_GRAY};
  cursor: pointer;
`;

function ToolTip() {
  const clickedCompanyCode = useSelector((state) => {
    return state.stock.clickedCompanyCode;
  });

  return (
    <ToolTipContainer>
      <SLink to={`/fundamental-analysis/companies/${clickedCompanyCode}`}>
        <IoSearch size={"1.3rem"} color={colors.TERNARY_GRAY} />
        기본적 분석 보기
      </SLink>
      <SLink to={`/technical-analysis/companies/${clickedCompanyCode}`}>
        <IoSearch size={"1.3rem"} color={colors.TERNARY_GRAY} />
        기술적 분석 보기
      </SLink>
    </ToolTipContainer>
  );
}

export default ToolTip;
