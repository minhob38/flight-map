import React, { Fragment } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const CompanyListConatiner = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
`;

const CompanyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, minmax(6rem, 1fr));
  grid-auto-rows: 5rem;
  justify-items: center;
  align-items: center;
  height: 100%;
  overflow: scroll;
`;

const HeaderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, minmax(6rem, 1fr));
  grid-template-rows: 1fr;
  justify-items: center;
  align-items: center;
  height: 5rem;
  background-color: #CFE0E8;
  font-weight: 900;
  color: #46565F;
`;

const Div = styled.div`
`;

export default function CompanyList() {
  const koreaKospiCoInfos = useSelector((state) => {
    return state.stock.koreaKospiCoInfos;
  });

  const coInfos = koreaKospiCoInfos.map((coinfo) => {
    return (
      <Fragment key={uuidv4()}>
        <Div>{coinfo?.["co_code"]}</Div>
        <Div>{coinfo?.["co_name"]}</Div>
        <Div>{coinfo?.["co_stock_price"]}</Div>
        <Div>{coinfo?.["co_market_cap"]}</Div>
        <Div>{coinfo?.["co_stock_num"]}</Div>
        <Div>{coinfo?.["co_stock_vol"]}</Div>
        <Div>{coinfo?.["co_per"]}</Div>
        <Div>{coinfo?.["co_roe"]}</Div>
      </Fragment>
    );
  });

  return (
    <CompanyListConatiner>
      <HeaderGrid>
        <Div>기업코드</Div>
        <Div>기업이름</Div>
        <Div>현재주가</Div>
        <Div>시가총액</Div>
        <Div>주식수</Div>
        <Div>거래량</Div>
        <Div>PER</Div>
        <Div>ROE</Div>
      </HeaderGrid>
      <CompanyGrid>
        {coInfos}
      </CompanyGrid>
    </CompanyListConatiner>
  );
}
