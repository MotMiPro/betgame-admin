import thunk from "redux-thunk";
import { combineReducers } from "redux";
import { createLogger } from "redux-logger";
import storage from "redux-persist/lib/storage/session";
import { persistStore, persistReducer } from "redux-persist";
import { createStore, applyMiddleware, compose } from "redux";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import * as compReducer from "../states";
const rootReducer = combineReducers(compReducer);
const persistConfig = {
  key: "bitwin__",
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

const middleware = [thunk];
const composeEnhancers =
  process.env.NODE_ENV !== "production" &&
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middleware, createLogger())
);

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer, enhancer);
export const persistor = persistStore(store);
