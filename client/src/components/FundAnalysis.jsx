import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import * as colors from "../constants/colors";
import generateFinancialStatementTableItem from "./helpers/generateFinancialStatementTableItem";
console.log(generateFinancialStatementTableItem)
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

const DateGridContainer = styled.div`
  display: flex;
  width: 100%;
`;

const NumberGrid = styled.div`
  flex:${(props) => {
    return props.columns;
  }};
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: ${(props) => {
    return `repeat(${props.columns}, minmax(10rem, 1fr))`;
  }};
  grid-template-rows: ${(props) => {
    return `repeat(${props.rows}, minmax(5rem, 1fr))`;
  }
};
  justify-items: center;
  align-items: center;
  color: ${colors.PRIMARY_GRAY};
`;

const ItemGrid = styled(NumberGrid)`
  flex:1;
  grid-template-columns: minmax(10rem, 1fr);
  grid-template-rows: ${(props) => {
    return `repeat(${props.rows}, minmax(5rem, 1fr))`;
  }
};
`;

const DateGrid = styled.div`
  flex:3;
  display: grid;
  grid-template-columns: ${(props) => {
    return `repeat(${props.columns}, minmax(10rem, 1fr))`;
  }};
  justify-items: center;
  align-items: center;
  height: 5rem;
  background-color: ${colors.TERNARY_GRAY};
  font-weight: 900;
  color: ${colors.PRIMARY_GRAY};
`;

const DummyGrid = styled(DateGrid)`
  flex:1;
  grid-template-columns: minmax(10rem, 1fr);
`;

const Div = styled.div`
`;

export default function FundAnalysis() {
  const ITEM_LIST = ["유동자산", "재고자산", "비유동자산", "매출채권및기타채권"];
  const fundamentalAnalysis = useSelector((state) => {
    return state.stock.fundamentalAnalysis;
  });

  const { dates, items, numbers, columns, rows }
    = generateFinancialStatementTableItem(fundamentalAnalysis);

  return (
    <>
      <FundAnalysisConatiner>
        <DateGridContainer>
          <DummyGrid>
            <Div> </Div>
          </DummyGrid>
          <DateGrid columns={columns}>
            {dates}
          </DateGrid>
        </DateGridContainer>
        <FinancialStatementGridContainer>
          <ItemGrid rows={rows}>
            {items}
          </ItemGrid>
          <NumberGrid columns={columns} rows={rows}>
            {numbers}
          </NumberGrid>
        </FinancialStatementGridContainer>
      </FundAnalysisConatiner>
    </>
  );
}
