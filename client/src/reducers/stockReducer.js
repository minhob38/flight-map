// ducks pattern: https://github.com/erikras/ducks-modular-redux
import { call, delay, put, takeLatest } from "redux-saga/effects";
import { createAction, handleActions } from "redux-actions";
import produce from "immer";

// actions types
const KOREA_KOSPI_CLICK = "stock/KOREA_KOSPI_CLICK";
const IS_LOADING_KOREA_KOSPI = "stock/IS_LOADING_KOREA_KOSPI";
const SCRAPING_CLICK = "stock/SCRAPING_CLICK";
const KOREA_KOSPI_CLICK_ASYNC = "stock/KOREA_KOSPI_CLICK_ASYNC";

// action creators
export const koreaKospiClick = createAction(KOREA_KOSPI_CLICK);
export const isLoadingKoreaKospi = createAction(IS_LOADING_KOREA_KOSPI);
export const scrapingClick = createAction(SCRAPING_CLICK, (coInfo) => coInfo);
export const koreaKospiClickAsync = createAction(KOREA_KOSPI_CLICK_ASYNC, (status) => status);

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

function* koreaKospiClickSaga(action) {
  yield put(koreaKospiClick());
  yield put(isLoadingKoreaKospi(true));

  const coInfo = yield call(fetchServer, {
    method: "GET",
    uri: "/api/stock/korea-companies/",
  });

  yield put(isLoadingKoreaKospi(false));
  yield put(scrapingClick(coInfo));
}

export function* stockSaga() {
  yield takeLatest(KOREA_KOSPI_CLICK_ASYNC, koreaKospiClickSaga);
}

const initialState = {
  koreaKospiCoInfos: [],
  isKoreaKospiClicked: false,
};

const stockReducer = handleActions(
  {
    [SCRAPING_CLICK]: (state, action) => {
      return produce(state, (draft) => {
        draft.koreaKospiCoInfos = action.payload;
        draft.isClickedKoreaKospi = action.payload;
      });
    },
    [KOREA_KOSPI_CLICK]: (state, action) => {
      return produce(state, (draft) => {
        draft.isKoreaKospiClicked = true;
      });
    },
    [IS_LOADING_KOREA_KOSPI]: (state, action) => {
      return produce(state, (draft) => {
        draft.isLoadingKoreaKospi = action.payload;
      });
    },
  },
  initialState,
);

export default stockReducer;
