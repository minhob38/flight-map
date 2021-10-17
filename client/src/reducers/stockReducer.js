// ducks pattern: https://github.com/erikras/ducks-modular-redux
import { call, delay, put, takeLatest } from "redux-saga/effects";
import { createAction, handleActions } from "redux-actions";
import produce from "immer";

// actions types
const KOREA_KOSPI_COMPANIES_CLICK = "stock/KOREA_KOSPI_COMPANIES_CLICK";
const SCRAPING_CLICK = "stock/SCRAPING_CLICK";
const KOREA_KOSPI_COMPANIES_CLICK_ASYNC = "stock/KOREA_KOSPI_COMPANIES_CLICK_ASYNC";

// action creators
export const koreaKospiCompaniesClick = createAction(KOREA_KOSPI_COMPANIES_CLICK);
export const scrapingClick = createAction(SCRAPING_CLICK, (coInfo) => coInfo);
export const koreaKospiCompaniesClickAsync = createAction(KOREA_KOSPI_COMPANIES_CLICK_ASYNC);

// sagas
const fetchServer = async (apiInfo) => {
  const { method, uri, data } = apiInfo;
  const body = method === "GET" ? undefined : JSON.stringify(data);

  const res = await fetch(uri, {
    method,
    body,
    headers: { "content-type": "application/json" },
  });

  return res.json();
};

function* koreaKospiCompaniesClickSaga(action) {
  yield put(koreaKospiCompaniesClick());

  const coInfo = yield call(fetchServer, {
    method: "GET",
    uri: "/api/stock/korea-companies/",
  });

  yield put(scrapingClick(coInfo));
}

export function* stockSaga() {
  yield takeLatest(KOREA_KOSPI_COMPANIES_CLICK_ASYNC, koreaKospiCompaniesClickSaga);
}

const initialState = {
  koreaKospiCoInfos: [],
  isKoreaKospiCompaniesClicked: false,
};

const stockReducer = handleActions(
  {
    [SCRAPING_CLICK]: (state, action) => {
      return produce(state, (draft) => {
        draft.koreaKospiCoInfos = action.payload;
        draft.isClickedKoreanKospiInfo = action.payload;
      });
    },
    [KOREA_KOSPI_COMPANIES_CLICK]: (state, action) => {
      return produce(state, (draft) => {
        draft.isKoreaKospiCompaniesClicked = true;
      });
    },
  },
  initialState,
);

export default stockReducer;
