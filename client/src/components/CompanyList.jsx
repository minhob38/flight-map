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

  const coInfos = koreaKospiCoInfos.map((coinfo) => {
    return (
      <CompanyItemGrid
        key={uuidv4()}
        data-company-code={coinfo?.["co_code"]}
        onClick={handleCompanyClick}
        clickedCoCode={clickedCompanyCode}
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
    <>
      <CompanyListConatiner>
        <HeaderGrid>
          <Div>????????????</Div>
          <Div>????????????</Div>
          <Div>????????????</Div>
          <Div>????????????</Div>
          <Div>?????????</Div>
          <Div>?????????</Div>
          <Div>PER</Div>
          <Div>ROE</Div>
        </HeaderGrid>
        <CompanyGrid>
          {coInfos}
        </CompanyGrid>
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
