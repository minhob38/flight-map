import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { IoSearch } from "react-icons/io5";
import * as colors from "../constants/colors";

const ToolTipContainer = styled.div`
  position: fixed;
  z-index: 15;
  top: ${(props) => `${props.position.clickedY}px`};
  left: ${(props) => `${props.position.clickedX}px`};
  display: ${(props) => {
    return props.isClicked ? "flex" : "none";
  }};
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 15rem;
  height: 5rem;
  border-radius: 0.5rem;
  background-color: ${colors.TERNARY_GRAY};
`;

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 56%;
  color: ${colors.PRIMARY_GRAY};
  font-weight: 900;
`;

function ToolTip() {
  const isCompanyItemClicked = useSelector((state) => state.stock.isCompanyItemClicked);
  const clickedPosition = useSelector((state) => state.stock.clickedPosition);

  return (
    <ToolTipContainer
      position={clickedPosition}
      isClicked={isCompanyItemClicked}
    >
      <Div>기본적 분석 보기
        <IoSearch size={"1.3rem"} color={colors.PRIMARY_GRAY} />
      </Div>
      <Div>기술적 분석 보기
        <IoSearch size={"1.3rem"} color={colors.PRIMARY_GRAY} />
      </Div>
    </ToolTipContainer>
  );
}
export default ToolTip;
