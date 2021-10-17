// ducks pattern: https://github.com/erikras/ducks-modular-redux
import { call, delay, put, takeLatest } from "redux-saga/effects";
import { createAction, handleActions } from "redux-actions";
import produce from "immer";

// actions types
const SCRAPING_CLICK = "stock/SCRAPING_CLICK";
const SCRAPING_CLICK_ASYNC = "stock/SCRAPING_CLICK_ASYNC";

// action creators
export const scrapingClick = createAction(SCRAPING_CLICK, (coInfo) => coInfo);
export const scrapingClickAsync = createAction(SCRAPING_CLICK_ASYNC);

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

function* stockScrapingClickSaga(action) {
  const coInfo = yield call(fetchServer, {
    method: "GET",
    uri: "/api/stock/korea-companies/",
  });

  yield put(scrapingClick(coInfo));
}

export function* stockSaga() {
  yield takeLatest(SCRAPING_CLICK_ASYNC, stockScrapingClickSaga);
}

const initialState = { koreaKospiCoInfos: [] };

const stockReducer = handleActions(
  {
    [SCRAPING_CLICK]: (state, action) => {
      return produce(state, (draft) => {
        draft.koreaKospiCoInfos = action.payload;
      });
    },
  },
  initialState,
);

export default stockReducer;
