import { createStore, applyMiddleware, compose } from "redux";
import axiosInstance from "../config/axios-config";
import reduxThunk from "redux-thunk";
import rootReducer from "./reducers";
import { offline } from "redux-offline";
import config from "redux-offline/lib/defaults";

const middleware = [reduxThunk];

// const composeEnhancers =
//   (typeof window !== "undefined" &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
//   compose;

const effect = (effect, _action) => axiosInstance(effect);

const getStore = (preloadedState = {}) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(...middleware),
      offline({
        ...config,
        effect
      })
    )
  );
  return store;
};

export default getStore;
