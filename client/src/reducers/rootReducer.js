import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import auth, { authSaga } from "./authReducer";

export function* rootSaga() {
  yield all([authSaga()]);
}

export default combineReducers({
  auth,
});
