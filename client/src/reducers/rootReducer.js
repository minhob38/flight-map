import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import auth, { authSaga } from "./authReducer";
import stock, { stockSaga } from "./stockReducer";

export function* rootSaga() {
  yield all([authSaga(), stockSaga()]);
}

export default combineReducers({
  auth,
  stock,
});
