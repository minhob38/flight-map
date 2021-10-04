import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import rootReducer, { rootSaga } from "../reducers/rootReducer";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
  middleware.push(createLogger());
}

const store = createStore(rootReducer, applyMiddleware(...middleware));
sagaMiddleware.run(rootSaga);

export default store;
