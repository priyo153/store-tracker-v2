import { CREATE_STORE, GET_STORE } from "../actions/types";

let initialState = [
  { name: "garia branch", id: "ST-1", lat: 123, lng: 456, img: "abc" },
  { name: "jadavpur branch", id: "ST-2", lat: 123, lng: 456, img: "abc" },
  { name: "rajpur branch", id: "ST-3", lat: 123, lng: 456, img: "abc" },
  { name: "patuli branch", id: "ST-4", lat: 123, lng: 456, img: "abc" },
];
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
