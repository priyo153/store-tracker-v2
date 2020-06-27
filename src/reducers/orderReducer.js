import { GET_ORDER, CREATE_ORDER } from "../actions/types";

let initialState = [
  { id: "ORD-1", storeid: "ST-1", amt: 50 },
  { id: "ORD-2", storeid: "ST-1", amt: 500 },
  { id: "ORD-3", storeid: "ST-2", amt: 20 },
  { id: "ORD-4", storeid: "ST-3", amt: 65 },
];
export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER:
      return [...state, action.payload];
    case GET_ORDER:
      return action.payload;
    default:
      return state;
  }
};
