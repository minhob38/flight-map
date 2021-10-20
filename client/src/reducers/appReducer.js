// ducks pattern: https://github.com/erikras/ducks-modular-redux
import { call, delay, put, takeLatest } from "redux-saga/effects";
import { createAction, handleActions } from "redux-actions";
import produce from "immer";

// actions types
const MODAL_ON = "app/MODAL_ON";
const MODAL_OFF = "app/MODAL_OFF";

// action creators
export const modalOn = createAction(MODAL_ON);
export const modalOff = createAction(MODAL_OFF);

export function* appSaga() {
  //
}

const initialState = {
  isModalVisible: false,
};

const appReducer = handleActions(
  {
    [MODAL_ON]: (state, action) => {
      return produce(state, (draft) => {
        draft.isModalVisible = true;
      });
    },
    [MODAL_OFF]: (state, action) => {
      return produce(state, (draft) => {
        draft.isModalVisible = false;
      });
    },
  },
  initialState,
);

export default appReducer;
