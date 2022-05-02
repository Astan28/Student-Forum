/* eslint-disable import/no-anonymous-default-export */
import {
  FETCH_EVENTS,
  FETCH_EVENT,
  NEW_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
} from "../actions/types";

const initialState = {
  items: [],
  item: {},
};
export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_EVENTS:
      return {
        ...state,
        items: action.payload,
      };
    case FETCH_EVENT:
      return {
        ...state,
        item: action.payload,
      };
    case NEW_EVENT:
      return {
        ...state,
        item: action.payload,
      };
    case UPDATE_EVENT:
      return {
        ...state,
        item: action.payload,
      };
    case DELETE_EVENT:
      return {
        ...state,
        item: action.payload,
      };
    default:
      return state;
  }
}
