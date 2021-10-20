// ducks pattern: https://github.com/erikras/ducks-modular-redux
import { call, delay, put, takeLatest } from "redux-saga/effects";
import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import fetchServer from "../utils/fetchServer";

// actions types
const LOGIN_CLICK = "auth/LOGIN_CLICK";
const LOGIN_CLICK_ASYNC = "auth/LOGIN_CLICK_ASYNC";

const SIGNUP_CLICK = "auth/SIGNUP_CLICK";
const SIGNUP_CLICK_ASYNC = "auth/SIGNUP_CLICK_ASYNC";

// action creators
export const loginClick = createAction(LOGIN_CLICK);
export const loginClickAsync = createAction(LOGIN_CLICK_ASYNC);
// ↑ export const loginClickAsync = () => ({ type: "auth/LOGIN_CLICK_ASYNC" });

export const signupClick = createAction(SIGNUP_CLICK);
export const signupClickAsync = createAction(SIGNUP_CLICK_ASYNC, (userInput) => userInput);

// sagas
function* loginClickSaga() {
  yield delay(1000);
  yield put(loginClick());
}

function* signupClickSaga(action) {
  yield call(fetchServer, {
    method: "POST",
    uri: "/api/auth/signup/",
    data: action.payload,
  });

  yield put(signupClick());
}

export function* authSaga() {
  yield takeLatest(LOGIN_CLICK_ASYNC, loginClickSaga);
  yield takeLatest(SIGNUP_CLICK_ASYNC, signupClickSaga);
}

const initialState = {
  isLoginClicked: false,
  isLoginStatus: false,
};

const authReducer = handleActions(
  {
    [LOGIN_CLICK]: (state, action) => {
      return produce(state, (draft) => {
        draft.isLoginClicked = true;
      });
    },
    [SIGNUP_CLICK]: (state, action) => {
      return produce(state, (draft) => {
        draft.isLoginStatus = true;
      });
    },
  },
  initialState,
);

export default authReducer;
