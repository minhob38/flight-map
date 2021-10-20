import React from "react";
import styled from "styled-components";
import { IoSearch } from "react-icons/io5";
import * as colors from "../constants/colors";

const ToolTipContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 15rem;
  height: 5rem;
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

function ToolTip() {
  return (
    <ToolTipContainer>
      <Div>기본적 분석 보기
        <IoSearch size={"1.3rem"} color={colors.TERNARY_GRAY} />
      </Div>
      <Div>기술적 분석 보기
        <IoSearch size={"1.3rem"} color={colors.TERNARY_GRAY} />
      </Div>
    </ToolTipContainer>
  );
}

export default ToolTip;
