// ducks pattern: https://github.com/erikras/ducks-modular-redux
import { delay, put, takeEvery, takeLatest } from "redux-saga/effects";
// import { createAction, handleActions } from "redux-actions";

// actions types
const LOGIN_CLICK = "LOGIN_CLICK";
const LOGIN_CLICK_ASYNC = "LOGIN_CLICK_ASYNC";

// action creators
export const loginClick = () => ({ type: LOGIN_CLICK });
export const loginClickAsync = () => ({ type: LOGIN_CLICK_ASYNC });

// sagas
// const loginClickAsync = createAction(LOGIN_CLICK, (actionType) => actionType);
function* loginClickSaga() {
  console.log("1~");
  yield delay(5000);
  console.log("~5");
  yield put(loginClick());
}

export function* authSaga() {
  console.log("!!!");
  yield takeLatest(LOGIN_CLICK_ASYNC, loginClickSaga);
}

const initialState = false;

const authReducer = (state = initialState, action) => {
  console.log("auth reducer");
  console.log(action);
  switch (action.type) {
    case LOGIN_CLICK:
      return true;
    default:
      return state;
  }
};

export default authReducer;
