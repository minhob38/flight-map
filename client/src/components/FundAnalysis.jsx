import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import * as colors from "../constants/colors";
import generateFinancialStatementTableItem from "../helpers/generateFinancialStatementTableItem";

const FundAnalysisConatiner = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
`;

const FinancialStatementContainer = styled.div`
  width: 60rem;
  box-sizing: border-box;
  border-bottom: 1px solid ${colors.TERNARY_GRAY};
  border-left: 1px solid ${colors.TERNARY_GRAY};
  border-right: 1px solid ${colors.TERNARY_GRAY};
`;

const DateGridContainer = styled.div`
  display: flex;
`;

const FinancialStatementGridContainer = styled(DateGridContainer)`
  overflow: scroll;
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
  }};
  justify-items: center;
  align-items: center;
  color: ${colors.PRIMARY_GRAY};
`;

const ItemGrid = styled(NumberGrid)`
  flex:1;
  grid-template-columns: minmax(10rem, 1fr);
  grid-template-rows: ${(props) => {
    return `repeat(${props.rows}, minmax(5rem, 1fr))`;
  }};
  font-weight: 900;
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
  const fundamentalAnalysis = useSelector((state) => {
    return state.stock.fundamentalAnalysis;
  });

  const { dates, items, numbers, columns, rows }
    = generateFinancialStatementTableItem(fundamentalAnalysis);

  return (
    <>
      <FundAnalysisConatiner>
        <FinancialStatementContainer>
          <DateGridContainer>
            <DummyGrid>
              <Div>재무상태표</Div>
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
        </FinancialStatementContainer>
        <FinancialStatementContainer>
          <DateGridContainer>
            <DummyGrid>
              <Div>재무상태표</Div>
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
        </FinancialStatementContainer>
      </FundAnalysisConatiner>
    </>
  );
}
