import { combineReducers } from "redux";
import storeReducer from "./storeReducer";
import orderReducer from "./orderReducer";

export default combineReducers({
  stores: storeReducer,
  orders: orderReducer,
});
