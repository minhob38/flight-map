import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import * as stockAction from "../reducers/stockReducer";
import * as appAction from "../reducers/appReducer";
import ToolTip from "./ToolTip";
import Modal from "./Modal";
import * as colors from "../constants/colors";

const FundAnalysisConatiner = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
`;

const FinancialStatementGridContainer = styled.div`
  display: flex;
  flex: 1;
  overflow: scroll;
`;

// background-color: ${(props) => {
//   if (props["data-company-code"] === props.clickedCoCode) {
//     return colors.PRIMARY_GRAY;
//   }
// }};
// color: ${(props) => {
//   if (props["data-company-code"] === props.clickedCoCode) {
//     return colors.TERNARY_GRAY;
//   }
// }};

const NumberGrid = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(1, minmax(6rem, 1fr));
  grid-template-rows: ${(props) => {
    return `repeat(${props.rows}, minmax(5rem, 1fr))`;
  }
};
  justify-items: center;
  align-items: center;
  cursor: pointer;
`;

const ItemGrid = styled(NumberGrid)`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(1, minmax(6rem, 1fr));
  grid-template-rows: ${(props) => {
    return `repeat(${props.rows}, minmax(5rem, 1fr))`;
  }
};
`;

const DateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, minmax(6rem, 1fr));
  grid-template-rows: ${(props) => {
    return `repeat(${props.rows}, minmax(5rem, 1fr))`;
  }
};
  justify-items: center;
  align-items: center;
  height: 5rem;
  background-color: ${colors.TERNARY_GRAY};
  font-weight: 900;
  color: ${colors.PRIMARY_GRAY};
`;

const Div = styled.div`
`;

export default function FundAnalysis() {
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
      <FundAnalysisConatiner>
        <DateGrid>
          <Div>N/A</Div>
          <Div>2019.12.31</Div>
          <Div>2019.12.31</Div>
          <Div>2019.12.31</Div>
          <Div>2019.12.31</Div>
          <Div>2020.12.31</Div>
        </DateGrid>
        <FinancialStatementGridContainer>
          <ItemGrid rows={54}>
            {coInfos}
          </ItemGrid>
          <NumberGrid rows={54}>
            {coInfos}
            {coInfos}
            {coInfos}
            {coInfos}
            {coInfos}
          </NumberGrid>
        </FinancialStatementGridContainer>
      </FundAnalysisConatiner>
    </>
  );
}
