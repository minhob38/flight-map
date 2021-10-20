import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import app, { appSaga } from "./appReducer";
import auth, { authSaga } from "./authReducer";
import stock, { stockSaga } from "./stockReducer";

export function* rootSaga() {
  yield all([appSaga(), authSaga(), stockSaga()]);
}

export default combineReducers({
  app,
  auth,
  stock,
});
