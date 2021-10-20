import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import * as actionCreators from "../reducers/stockReducer";
import ToolTip from "./ToolTip";
import * as colors from "../constants/colors";

const CompanyListConatiner = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
`;

const CompanyGrid = styled.div`
  flex: 1;
  overflow: scroll;
`;

const CompanyItemGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, minmax(6rem, 1fr));
  grid-template-rows: 5rem;
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
  grid-template-columns: repeat(8, minmax(6rem, 1fr));
  grid-template-rows: 1fr;
  justify-items: center;
  align-items: center;
  height: 5rem;
  background-color: ${colors.TERNARY_GRAY};
  font-weight: 900;
  color: #46565F;
`;

const Div = styled.div`
`;

export default function CompanyList() {
  const dispatch = useDispatch();

  const koreaKospiCoInfos = useSelector((state) => {
    return state.stock.koreaKospiCoInfos;
  });

  const [clickedCoCode, setClickedCoCode] = useState("");

  const handleCompanyClick = (ev) => {
    setClickedCoCode(ev.currentTarget.dataset.companyCode);

    dispatch(actionCreators.companyItemClick({
      clickedX: ev.clientX,
      clickedY: ev.clientY,
    }));
  };

  const coInfos = koreaKospiCoInfos.map((coinfo) => {
    return (
      <CompanyItemGrid
        key={uuidv4()}
        data-company-code={coinfo?.["co_code"]}
        onClick={handleCompanyClick}
        clickedCoCode={clickedCoCode}
      >
        <Div>{coinfo?.["co_code"]}</Div>
        <Div>{coinfo?.["co_name"]}</Div>
        <Div>{coinfo?.["co_stock_price"]}</Div>
        <Div>{coinfo?.["co_market_cap"]}</Div>
        <Div>{coinfo?.["co_stock_num"]}</Div>
        <Div>{coinfo?.["co_stock_vol"]}</Div>
        <Div>{coinfo?.["co_per"]}</Div>
        <Div>{coinfo?.["co_roe"]}</Div>
      </CompanyItemGrid>
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
      {/* <CompanyGrid onClick={setIsCompanyClicked(isCompanyClicked)}> */}
      <CompanyGrid>
        {coInfos}
      </CompanyGrid>
      <ToolTip />
      {/* <ToolTip position={clickedPosition} isComapnyClicked={isCompanyClicked} /> */}
    </CompanyListConatiner>
  );
}
