import { CREATE_STORE, CREATE_ORDER, GET_ORDER, GET_STORE } from "./types";

export const createOrder = (formValues) => async (dispatch) => {
  const response = await fetch("");
  response.then((data) => {
    dispatch({
      type: CREATE_ORDER,
      payload: formValues,
    });
  });
};
export const getOrders = () => async (dispatch) => {
  const response = await fetch("");
  response.then((data) => {
    dispatch({
      type: GET_ORDER,
      payload: data,
    });
  });
};
export const createStore = (formValues) => async (dispatch) => {
  const response = await fetch("");
  const data = await response.json();
  data.then((info) => {
    dispatch({
      type: CREATE_ORDER,
      payload: formValues,
    });
  });
};
export const getStores = () => async (dispatch) => {
  const response = await fetch("");
  const data = await response.json();
  data.then((info) => {
    dispatch({
      type: GET_STORE,
      payload: info,
    });
  });
};
