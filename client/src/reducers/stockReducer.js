// ducks pattern: https://github.com/erikras/ducks-modular-redux
import { call, delay, put, takeLatest } from "redux-saga/effects";
import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import * as appAction from "./appReducer";
import fetchServer from "../utils/fetchServer";

// actions types
const KOREA_KOSPI_CLICK = "stock/KOREA_KOSPI_CLICK";
const IS_LOADING_KOREA_KOSPI = "stock/IS_LOADING_KOREA_KOSPI";
const KOREA_KOSPI_CLICK_ASYNC = "stock/KOREA_KOSPI_CLICK_ASYNC";
const KOREA_COMPANY_CLICK = "stock/KOREA_COMPANY_CLICK";

const FUNDAMENTAL_ANALYSIS_CLICK_ASYNC = "stock/FUNDAMENTAL_ANALYSIS_CLICK_ASYNC";
const FUNDAMENTAL_ANALYSIS_CLICK = "stock/FUNDAMENTAL_ANALYSIS_CLICK";

// action creators
export const koreaKospiClickAsync = createAction(KOREA_KOSPI_CLICK_ASYNC, (status) => status);
export const koreaKospiClick = createAction(KOREA_KOSPI_CLICK, (coInfo) => coInfo);
export const isLoadingKoreaKospi = createAction(IS_LOADING_KOREA_KOSPI);
export const koreaCompanyClick = createAction(KOREA_COMPANY_CLICK, (companyCode) => companyCode);

export const fundamentalAnalysisClickAsync = createAction(
  FUNDAMENTAL_ANALYSIS_CLICK_ASYNC,
  (companyCode) => companyCode,
);
export const fundamentalAnalysisClick = createAction(
  FUNDAMENTAL_ANALYSIS_CLICK,
  (coInfo) => coInfo,
);

// sagas
function* koreaKospiClickSaga(action) {
  yield put(appAction.enableLoading());

  const coInfo = yield call(fetchServer, {
    method: "GET",
    uri: "/api/stock/korea-companies/",
  });

  yield put(appAction.disableLoading());
  yield put(koreaKospiClick(coInfo));
}

function* fundamentalAnalysisClickSaga(action) {
  yield put(appAction.enableLoading());
  const companyCode = action.payload;
  const res = yield call(fetchServer, {
    method: "GET",
    uri: `/api/stock/korea/companies/${companyCode}/fundamental-analysis/`,
  });

  // if (res.message !== "success") {
  //   ....
  // }
  yield put(appAction.disableLoading());
  yield put(appAction.disableModal());
  yield put(fundamentalAnalysisClick(res.payload));
}

export function* stockSaga() {
  yield takeLatest(KOREA_KOSPI_CLICK_ASYNC, koreaKospiClickSaga);
  yield takeLatest(FUNDAMENTAL_ANALYSIS_CLICK_ASYNC, fundamentalAnalysisClickSaga);
}

const initialState = {
  koreaKospiCoInfos: [],
  clickedCompanyCode: "",
  fundamentalAnalysis: {},
};

const stockReducer = handleActions(
  {
    [KOREA_KOSPI_CLICK]: (state, action) => {
      return produce(state, (draft) => {
        draft.koreaKospiCoInfos = action.payload;
      });
    },
    [KOREA_COMPANY_CLICK]: (state, action) => {
      return produce(state, (draft) => {
        draft.clickedCompanyCode = action.payload;
      });
    },
    [FUNDAMENTAL_ANALYSIS_CLICK]: (state, action) => {
      return produce(state, (draft) => {
        const fundamentalAnalysis = action.payload;
        const _fundamentalAnalysis = {};

        for (const key in fundamentalAnalysis) {
          _fundamentalAnalysis[key] = Object.values(fundamentalAnalysis[key]);
        }

        draft.fundamentalAnalysis = _fundamentalAnalysis;
      });
    },
  },
  initialState,
);

export default stockReducer;
