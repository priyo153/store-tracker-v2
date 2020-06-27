import React from "react";
import ReactDom from "react-dom";
import App from "./components/App";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import Reducers from "./reducers";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(Reducers, composeEnhancers(applyMiddleware(thunk)));
ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
