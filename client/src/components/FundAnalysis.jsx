import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
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
  const fundamentalAnalysis = useSelector((state) => {
    return state.stock.fundamentalAnalysis;
  });

  const items = fundamentalAnalysis["item"]?.map((item) => {
    return <Div key={uuidv4()}>{item}</Div>;
  });

  let numbers = [];
  let dates = [];

  const columns = Object.keys(fundamentalAnalysis).length - 1;
  const rows = fundamentalAnalysis["item"].length;

  for (const key in fundamentalAnalysis) {
    if (/\d{8}/.test(key)) {
      const number = fundamentalAnalysis[key]?.map((item) => {
        return <Div key={uuidv4()}>{item}</Div>;
      });

      numbers = [...numbers, number];
      dates = [...dates, key];
    }
  }

  const _dates = dates.map((date) => {
    return <Div key={uuidv4()}>{date}</Div>;
  });

  return (
    <>
      <FundAnalysisConatiner>
        <DateGridContainer>
          <DummyGrid>
            <Div> </Div>
          </DummyGrid>
          <DateGrid columns={columns}>
            {_dates}
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
