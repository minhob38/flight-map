import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const GridContainer = styled.div`
  max-width: 50rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, minmax(5rem, 1fr));
  grid-auto-rows: minmax(5rem, 10rem);
  background-color: red;
  height: 100%;
`;

export default function CompanyList() {
  const koreaKospiCoInfos = useSelector((state) => {
    return state.stock.koreaKospiCoInfos;
  });

  const coInfos = koreaKospiCoInfos.map((coinfo, idx) => {
    return (
      <>
        <div>{coinfo?.["co_code"]}</div>
        <div>{coinfo?.["co_name"]}</div>
        <div>{coinfo?.["co_stock_price"]}</div>
        <div>{coinfo?.["co_market_cap"]}</div>
        <div>{coinfo?.["co_stock_num"]}</div>
        <div>{coinfo?.["co_stock_vol"]}</div>
        <div>{coinfo?.["co_per"]}</div>
        <div>{coinfo?.["co_roe"]}</div>
      </>
    );
  });

  return (
    <GridContainer>
      <Grid>
        {coInfos}
        {/* <div>{koreaKospiCoInfos[0]?.co_name}</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>7</div>
        <div>8</div> */}
      </Grid>
    </GridContainer>
  );
}
