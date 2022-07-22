import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import convertNumberToText from "../utils/convertNumberToText";

const Div = styled.div``;

const generateFinancialStatementTableItem = (fundamentalAnalysis) => {
  const ITEM_LIST = [
    "자산총계",
    "유동자산",
    "비유동자산",
    "부채총계",
    "유동부채",
    "비유동부채",
    "자본총계",
    "매출채권",
  ];
  const show_idxs = [];
  let numbers = [];
  let dates = [];

  const items = ITEM_LIST.map((item) => {
    const indexAtRawData = fundamentalAnalysis["item"]?.indexOf(item);

    if (indexAtRawData === -1) {
      return;
    }

    show_idxs.push(indexAtRawData);
    return <Div key={uuidv4()}>{item}</Div>;
  });

  for (const key in fundamentalAnalysis) {
    if (/\d{8}/.test(key)) {
      const number = show_idxs.map((item) => {
        const numberAtRawData = fundamentalAnalysis[key][item];
        return <Div key={uuidv4()}>{convertNumberToText(numberAtRawData)}</Div>;
      });

      numbers = [...numbers, ...number];
      dates = [...dates, key];
    }
  }

  const _dates = dates.map((date) => <Div key={uuidv4()}>{date}</Div>);

  const filterItems = items?.filter((item) => item);
  const filteredNumbers = numbers.filter((item) => item);
  const columns = Object.keys(fundamentalAnalysis).length - 1;
  const rows = filterItems?.length;

  return { dates: _dates, items: filterItems, numbers: filteredNumbers, columns, rows };
};

export default generateFinancialStatementTableItem;
