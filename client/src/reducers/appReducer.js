// ducks pattern: https://github.com/erikras/ducks-modular-redux
import { call, delay, put, takeLatest } from "redux-saga/effects";
import { createAction, handleActions } from "redux-actions";
import produce from "immer";

// actions types
const ENABLE_LOADING = "app/ENABLE_LOADING";
const DISABLE_LOADING = "app/DISABLE_LOADING";
// const MODAL_ON = "app/MODAL_ON";
// const MODAL_OFF = "app/MODAL_OFF";
const ENABLE_MODAL = "app/ENABLE_MODAL";
const DISABLE_MODAL = "app/DISABLE_MODAL";

// action creators
export const enableLoading = createAction(ENABLE_LOADING);
export const disableLoading = createAction(DISABLE_LOADING);

export const enableModal = createAction(ENABLE_MODAL);
export const disableModal = createAction(DISABLE_MODAL);

export function* appSaga() {
  //
}

const initialState = {
  isLoading: false,
  isModalVisible: false,
};

const appReducer = handleActions(
  {
    [ENABLE_LOADING]: (state, action) => {
      return produce(state, (draft) => {
        draft.isLoading = true;
      });
    },
    [DISABLE_LOADING]: (state, action) => {
      return produce(state, (draft) => {
        draft.isLoading = false;
      });
    },
    [ENABLE_MODAL]: (state, action) => {
      return produce(state, (draft) => {
        draft.isModalVisible = true;
      });
    },
    [DISABLE_MODAL]: (state, action) => {
      return produce(state, (draft) => {
        draft.isModalVisible = false;
      });
    },
  },
  initialState,
);

export default appReducer;
