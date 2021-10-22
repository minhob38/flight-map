import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import * as stockAction from "../reducers/stockReducer";
import * as appAction from "../reducers/appReducer";
import ToolTip from "./ToolTip";
import Modal from "./Modal";
import * as colors from "../constants/colors";

const CompanyListConatiner = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
`;

const CompanyGridContainer = styled.div`
  flex: 1;
  overflow: scroll;
`;

// const CompanyGrid = styled.div`
//   flex: 1;
//   overflow: scroll;
// `;

const CompanyGrid = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(6, minmax(6rem, 1fr));
  grid-template-rows: repeat(54, minmax(5rem, 1fr));
  justify-items: center;
  align-items: center;
  background-color: ${(props) => {
    if (props["data-company-code"] === props.clickedCoCode) {
      return colors.PRIMARY_GRAY;
    }
  }};
  color: ${(props) => {
    if (props["data-company-code"] === props.clickedCoCode) {
      return colors.TERNARY_GRAY;
    }
  }};
  cursor: pointer;
`;

const HeaderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, minmax(6rem, 1fr));
  grid-template-rows: repeat(54, minmax(6rem, 1fr));
  justify-items: center;
  align-items: center;
  height: 5rem;
  background-color: ${colors.TERNARY_GRAY};
  font-weight: 900;
  color: ${colors.PRIMARY_GRAY};
`;

const Div = styled.div`
`;

export default function CompanyList() {
  const dispatch = useDispatch();

  const fundamentalAnalysis = useSelector((state) => {
    return state.stock.fundamentalAnalysis;
  });
  const isModalVisible = useSelector((state) => {
    return state.app.isModalVisible;
  });

  const clickedCompanyCode = useSelector((state) => {
    return state.stock.clickedCompanyCode;
  });

  const handleCompanyClick = (ev) => {
    dispatch(stockAction.koreaCompanyClick(ev.currentTarget.dataset.companyCode));
    dispatch(appAction.enableModal());
  };

  const coInfos = fundamentalAnalysis["item"]?.map((coinfo) => {
    return (
      // <CompanyGrid
      //   key={uuidv4()}
      //   data-company-code={coinfo?.["co_code"]}
      //   onClick={handleCompanyClick}
      //   clickedCoCode={clickedCompanyCode}
      // >
        <Div>{coinfo}</Div>
      // </CompanyGrid>
    );
  });

  return (
    <>
      <CompanyListConatiner>
        <HeaderGrid>
          <Div>N/A</Div>
          <Div>2019.12.31</Div>
          <Div>2019.12.31</Div>
          <Div>2019.12.31</Div>
          <Div>2019.12.31</Div>
          <Div>2020.12.31</Div>
        </HeaderGrid>
        <CompanyGridContainer>
          <CompanyGrid>
            {coInfos}
            {coInfos}
            {coInfos}
            {coInfos}
            {coInfos}
            {coInfos}
          </CompanyGrid>
        </CompanyGridContainer>
        {/* <ToolTip /> */}
      </CompanyListConatiner>
      {isModalVisible && (
        <Modal>
          <ToolTip />
        </Modal>
      )}
    </>
  );
}
