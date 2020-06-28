import { CREATE_STORE, GET_STORE } from "../actions/types";

let initialState = [];
export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_STORE:
      return [...state, action.payload];
    case GET_STORE:
      return action.payload;
    default:
      return state;
  }
};
