// ducks pattern: https://github.com/erikras/ducks-modular-redux
import { delay, put, takeLatest } from "redux-saga/effects";
import { createAction, handleActions } from "redux-actions";
import produce from "immer";

// actions types
const LOGIN_CLICK = "auth/LOGIN_CLICK";
const LOGIN_CLICK_ASYNC = "auth/LOGIN_CLICK_ASYNC";

// action creators
export const loginClick = createAction(LOGIN_CLICK);
export const loginClickAsync = createAction(LOGIN_CLICK_ASYNC);
// ↑ export const loginClickAsync = () => ({ type: "auth/LOGIN_CLICK_ASYNC" });

// sagas
function* loginClickSaga() {
  yield delay(1000);
  yield put(loginClick());
}

export function* authSaga() {
  yield takeLatest(LOGIN_CLICK_ASYNC, loginClickSaga);
}

const initialState = {
  isLoginClicked: false,
};

const authReducer = handleActions(
  {
    [LOGIN_CLICK]: (state, action) => {
      return produce(state, (dratf) => {
        dratf.isLoginClicked = true;
      });
    },
  },
  initialState,
);

export default authReducer;
