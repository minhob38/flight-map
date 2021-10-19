import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const ToolTipContainer = styled.div`
  position: absolute;
  display: ${(props) => {
    return props.isClicked ? "block" : "none";
  }};
  top: ${(props) => `${props.position.clickedY}px`};
  left: ${(props) => `${props.position.clickedX}px`};
  background-color: yellow;
  width: 10rem;
  height: 10rem;
  z-index: 15;
`;

function ToolTip() {
  const isCompanyItemClicked = useSelector((state) => state.stock.isCompanyItemClicked);
  const clickedPosition = useSelector((state) => state.stock.clickedPosition);

  return (
    <ToolTipContainer
      position={clickedPosition}
      isClicked={isCompanyItemClicked}
    />
  );
}
export default ToolTip;
