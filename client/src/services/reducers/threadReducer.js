/* eslint-disable import/no-anonymous-default-export */
import {
  FETCH_THREADS,
  FETCH_THREAD,
  NEW_THREAD,
  UPDATE_THREAD,
  DELETE_THREAD,
} from "../actions/types";

const initialState = {
  items: [],
  item: {},
};
export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_THREADS:
      return {
        ...state,
        items: action.payload,
      };
    case FETCH_THREAD:
      return {
        ...state,
        item: action.payload,
      };
    case NEW_THREAD:
      return {
        ...state,
        item: action.payload,
      };
    case UPDATE_THREAD:
      return {
        ...state,
        item: action.payload,
      };
    case DELETE_THREAD:
      return {
        ...state,
        item: action.payload,
      };
    default:
      return state;
  }
}
