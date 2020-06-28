import { GET_ORDER, GET_STORE } from "./types";
import { storesRef, ordersRef } from "../firebase";

export const createOrder = (formValues) => async (dispatch) => {
  ordersRef.push().set(formValues);
};
export const getOrders = () => async (dispatch) => {
  ordersRef.on("value", (snapshot) => {
    if (snapshot.val() !== null) {
      dispatch({
        type: GET_ORDER,
        payload: Object.values(snapshot.val()),
      });
    }
  });
};
export const createStore = (formValues) => async (dispatch) => {
  storesRef.push().set(formValues);
};
export const getStores = () => async (dispatch) => {
  storesRef.on("value", (snapshot) => {
    if (snapshot.val() !== null) {
      dispatch({
        type: GET_STORE,
        payload: Object.values(snapshot.val()),
      });
    }
  });
};
